import './globals.css';
import { Open_Sans } from 'next/font/google';
import { getLocale } from 'next-intl/server';

import { ThemeProvider, ReactQueryClientProvider, appMetadata, I18nProvider } from '@/src/app';
import { cn } from '@/src/shared/lib/classnames';
import { Toaster } from '@/src/shared/ui/toaster';

import type { Metadata } from 'next';

const font = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = appMetadata;

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <ReactQueryClientProvider>
      <html lang={locale}>
        <body className={cn('flex flex-col min-h-[100vh]', font.className)}>
          <I18nProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              storageKey='theme'
              enableSystem
              disableTransitionOnChange
            >
              {children}

              <Toaster />
            </ThemeProvider>
          </I18nProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}

export default RootLayout;
