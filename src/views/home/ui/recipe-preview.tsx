import Image from 'next/image';
import Link from 'next/link';

import { type RecipePreview, RecipeTagsSection } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { Skeleton } from '@/src/shared/ui/skeleton';

interface RecipePreviewSectionProps {
  sectionTitle: string;
  recipes: Array<RecipePreview>;
}

function RecipePreviewSection({ sectionTitle, recipes }: RecipePreviewSectionProps) {
  if (recipes.length === 0) return null;

  return (
    <section className='space-y-2'>
      <h2 className='text-xl font-semibold'>{sectionTitle}</h2>
      <div className='flex flex-nowrap gap-x-3 overflow-x-auto hide-scrollbar'>
        {recipes.map(recipe => (
          <SingleRecipePreview key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}

interface RecipePreviewProps {
  recipe: RecipePreview;
}

function SingleRecipePreview({ recipe }: RecipePreviewProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)} className='min-w-56 w-56 space-y-2'>
      <div className='relative min-h-48 h-[25vh]'>
        <RecipeTagsSection recipe={recipe} />
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes='250px'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className='text-base font-medium leading-5 line-clamp-2'>{recipe.title}</p>
    </Link>
  );
}

function RecipePreviewSectionSkeleton() {
  return (
    <section className='page-container pt-0 gap-y-2 pb-0'>
      <Skeleton className='h-6 w-1/2' />

      <div className='flex flex-nowrap gap-x-3 pb-2 overflow-x-auto hide-scrollbar'>
        {new Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} className='min-h-48 h-[25vh] min-w-56' />
        ))}
      </div>
    </section>
  );
}

export { RecipePreviewSection, RecipePreviewSectionSkeleton };
