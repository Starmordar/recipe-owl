import { RecipeTagsSummary } from './recipe-tags-summary';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Entities/Recipe/recipe-tags-summary',
  component: RecipeTagsSummary,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeTagsSummary>;

export default meta;
type Story = StoryObj<typeof RecipeTagsSummary>;

export const Default: Story = {
  args: {
    tags: ['Georgian', 'Chill'],
  },
};
