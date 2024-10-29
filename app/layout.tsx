import './globals.css';
import { Inter } from 'next/font/google';

import { ThemeProvider, ReactQueryClientProvider, appMetadata } from '@/src/app';
import { cn } from '@/src/shared/lib/classnames';
import { Toaster } from '@/src/shared/ui/toaster';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = appMetadata;

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
