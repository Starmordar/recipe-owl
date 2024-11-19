import { CookingPot } from 'lucide-react';

function EmptyCreatedRecipes() {
  return (
    <div className='text-center space-y-2 flex flex-col pt-[10vh] items-center px-5'>
      <CookingPot className='h-20 w-20' />
      <h2 className='text-xl font-semibold'>No saved recipes yet</h2>
      <p className='text-sm'>
        You haven&apos;t saved any recipes. Find and save recipes to cook and see them here!
      </p>
    </div>
  );
}

export { EmptyCreatedRecipes };
