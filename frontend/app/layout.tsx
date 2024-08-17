import './globals.css';
import { Inter } from 'next/font/google';

import QueryClientProvider from '@/components/query-client-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import type { Metadata } from 'next';

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

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider>
      <html lang='en'>
        <body className={cn('flex flex-col min-h-[100vh]', inter.className)}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}

export default RootLayout;
