import { Open_Sans } from 'next/font/google';
import { ReactNode } from 'react';

import { cn } from '@/src/shared/lib/classnames';
import { Toaster } from '@/src/shared/ui/toaster';

import { I18nProvider } from '../providers/i18n-provider';
import { ReactQueryClientProvider } from '../providers/query-client-provider';
import { ThemeProvider } from '../providers/theme-provider';

const font = Open_Sans({ subsets: ['latin', 'cyrillic'] });

interface Props {
  children: ReactNode;
  locale: string;
}

function BaseLayout({ children, locale }: Props) {
  return (
    <html lang={locale}>
      <body className={cn('flex flex-col min-h-[100vh]', font.className)}>
        <ReactQueryClientProvider>
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
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

export { BaseLayout };
