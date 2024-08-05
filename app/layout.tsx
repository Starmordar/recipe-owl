import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import BottomNavbar from '@/components/layout/bottom-navbar';
import RecipesSearch from '@/components/layout/recipes-search';
import QueryClientProvider from '@/components/query-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PWA NextJS',
  description: "It's a simple progressive web application made with NextJS",
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <RecipesSearch />

          {children}

          <div className="fixed bottom-0 mx-0 w-full">
            <BottomNavbar />
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
