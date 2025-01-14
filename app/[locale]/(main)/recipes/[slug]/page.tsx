import { getMetadata, RecipeDetailsPage } from '@/src/views/recipe-details';

import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | null> {
  return getMetadata(Number(params.slug));
}

async function Page({ params }: PageProps) {
  return <RecipeDetailsPage recipeId={Number(params.slug)} />;
}

export default Page;
