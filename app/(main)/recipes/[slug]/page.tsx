import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import RecipeDetailsHeader from '@/app/(main)/recipes/[slug]/_components/recipe-details-header';
import RecipeDetails from '@/components/recipe-details';
import RecipeDetailsSkeleton from '@/components/recipe-details/skeleton';
import { getRecipeDetails } from '@/lib/data/recipe';
import { getRecipeJsonLdScheme } from '@/lib/json-ld/recipe';

import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | null> {
  const recipe = await getRecipeDetails(Number(params.slug));
  if (!recipe) return notFound();

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      images: [recipe.imageUrl],
    },
  };
}

async function Page({ params }: PageProps) {
  const recipe = await getRecipeDetails(Number(params.slug));
  if (!recipe) return notFound();

  const jsonLd = getRecipeJsonLdScheme(recipe);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <RecipeDetailsHeader recipeId={Number(params.slug)} />

      <main className='page-container'>
        <Suspense key={params.slug} fallback={<RecipeDetailsSkeleton />}>
          <RecipeDetails recipeId={Number(params.slug)} />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
