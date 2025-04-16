import React from 'react';
import type { Preview } from '@storybook/react'
import '../app/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import defaultMessages from '../messages/en.json'
import { withThemeByClassName } from "@storybook/addon-themes";
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },

    nextjs: {
      appDirectory: true,
    },

    a11y: {
      test: 'todo'
    }
  },
  decorators: [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }), 
  (Story) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
  (Story) => (
    <NextIntlClientProvider
      locale="en"
      messages={defaultMessages}
    >
      <Story />
    </NextIntlClientProvider>
  )],

  loaders: [mswLoader],
  tags: ['autodocs'],
};

export default preview;