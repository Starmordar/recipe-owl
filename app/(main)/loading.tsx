import { RecipeOfTheDaySkeleton } from '@/src/views/home/ui/recipe-of-the-day/skeleton';
import { RecipePreviewSectionSkeleton } from '@/src/views/home/ui/recipe-preview';

export default function Loading() {
  return (
    <>
      <RecipeOfTheDaySkeleton />
      <RecipePreviewSectionSkeleton />
    </>
  );
}
