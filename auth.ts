import { PrismaAdapter } from '@auth/prisma-adapter';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProdiver from 'next-auth/providers/google';

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProdiver({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const [googleAccount] = await prisma.account.findMany({
        where: { userId: user.id, provider: 'google' },
      });

      const expires_at = googleAccount.expires_at as number;
      const refresh_token = googleAccount.refresh_token as string;

      if (expires_at * 1000 < Date.now()) {
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID,
              client_secret: process.env.AUTH_GOOGLE_SECRET,
              grant_type: 'refresh_token',
              refresh_token,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          await prisma.account.update({
            data: {
              access_token: newTokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
              refresh_token: newTokens.refresh_token ?? googleAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: googleAccount.providerAccountId,
              },
            },
          });
        } catch (error) {
          session.error = 'RefreshTokenError';
        }
      }
      return session;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError';
  }
}
