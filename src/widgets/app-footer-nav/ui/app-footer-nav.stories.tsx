import { http, HttpResponse } from 'msw';

import { AppFooterNav } from './app-footer-nav';

import type { Meta, StoryObj } from '@storybook/react';

const userMock = {
  picture:
    'https://lh3.googleusercontent.com/a/ACg8ocLgUpA47GRp-fCdqXfCIPocmvJT4tQNUsM0cgDP-Re_lTT3tuM=s96-c',
};

const meta: Meta<typeof AppFooterNav> = {
  title: 'Widgets/app-footer-nav',
  component: AppFooterNav,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        http.get('/api/user', () => {
          return HttpResponse.json(userMock);
        }),
      ],
    },
  },
  decorators: Story => (
    <div className='w-96'>
      <Story />
    </div>
  ),
} satisfies Meta<typeof AppFooterNav>;

export default meta;
type Story = StoryObj<typeof AppFooterNav>;

export const HomePage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/' },
    },
  },
};

export const RecipesPage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/recipes' },
    },
  },
};

export const NewPage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/recipes/new' },
    },
  },
};

export const CartPage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/cart' },
    },
  },
};

export const ProfilePage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/profile' },
    },
  },
};
