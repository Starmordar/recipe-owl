import './globals.css';
import { Open_Sans } from 'next/font/google';

import { ThemeProvider, ReactQueryClientProvider, appMetadata } from '@/src/app';
import { cn } from '@/src/shared/lib/classnames';
import { Toaster } from '@/src/shared/ui/toaster';

import type { Metadata } from 'next';

const font = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = appMetadata;

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryClientProvider>
      <html lang='en'>
        <body className={cn('flex flex-col min-h-[100vh]', font.className)}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            storageKey='theme'
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
