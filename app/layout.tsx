import './globals.css';
import { Inter } from 'next/font/google';

import { ThemeProvider, ReactQueryClientProvider } from '@/src/app';
import { cn } from '@/src/shared/lib/classnames';
import { Toaster } from '@/src/shared/ui/toaster';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe OWL',
  description:
    'Discover, organize, and manage your favorite recipes with ease. Recipe OWL lets you add personal recipes, create grocery lists, and bring your culinary ideas to life—all in one place!',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords:
    'Recipe OWL, recipe manager, personal recipes, grocery list, organize recipes, cooking app, save recipes, recipe book',
  authors: [{ name: 'Roman Borovik', url: 'https://github.com/Starmordar' }],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon_x128.png' },
    { rel: 'icon', url: 'icons/icon_x128.png' },
  ],
  openGraph: {
    images: ['icons/icon_x512.png'],
  },
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryClientProvider>
      <html lang='en'>
        <body className={cn('flex flex-col min-h-[100vh]', inter.className)}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}

export default RootLayout;
