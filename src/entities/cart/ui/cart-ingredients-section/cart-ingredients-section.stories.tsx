import { useState } from 'react';

import { CartIngredientsSection } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Entities/Cart/ingredients-section',
  component: CartIngredientsSection,
  parameters: {
    layout: 'centered',
  },
  decorators: Story => (
    <div className='w-80'>
      <Story />
    </div>
  ),
} satisfies Meta<typeof CartIngredientsSection>;

export default meta;
type Story = StoryObj<typeof CartIngredientsSection>;

const SectionWithDynamicItems = () => {
  const [ingredients, setIngredients] = useState([
    { name: 'Cabbage' },
    { name: 'Carrot' },
    { name: 'Sausage' },
  ]);

  function onCheckedChange(item: { name: string }) {
    setIngredients(value => value.filter(({ name }) => name !== item.name));
  }

  return (
    <CartIngredientsSection
      ingredients={ingredients}
      renderContent={item => (
        <>
          <div className='flex gap-x-2 text-base'>
            <p className='font-medium'>{item.name}</p>
            <p className='text-muted-foreground'>24</p>
          </div>
        </>
      )}
      onClick={onCheckedChange}
      checked={false}
    />
  );
};

export const Default: Story = {
  render: SectionWithDynamicItems,
};
