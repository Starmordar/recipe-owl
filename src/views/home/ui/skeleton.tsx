import { RecipeOfTheDaySkeleton } from './recipe-of-the-day/skeleton';
import { RecipePreviewSectionSkeleton } from './recipe-preview';

export default function PageSkeleton() {
  return (
    <>
      <RecipeOfTheDaySkeleton />
      <div className='page-container flex flex-col py-6'>
        <RecipePreviewSectionSkeleton />
      </div>
    </>
  );
}

export { PageSkeleton };
