import { RecipeAuthor } from './recipe-author';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Entities/Recipe/recipe-author',
  component: RecipeAuthor,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeAuthor>;

export default meta;
type Story = StoryObj<typeof RecipeAuthor>;

export const Default: Story = {
  args: {
    author: {
      fullName: 'Roman Borovik',
      picture:
        'https://lh3.googleusercontent.com/a/ACg8ocLgUpA47GRp-fCdqXfCIPocmvJT4tQNUsM0cgDP-Re_lTT3tuM=s96-c',
    },
  },
};

export const WithoutPicture: Story = {
  args: {
    author: {
      fullName: 'Roman Borovik',
      picture: null,
    },
  },
};

export const CustomSizeWithPicture: Story = {
  args: {
    ...Default.args,
    avatarSize: 40,
  },
};

export const CustomSizeWithoutPicture: Story = {
  args: {
    ...WithoutPicture.args,
    avatarSize: 40,
  },
};
