import { getMetadata, RecipeDetailsPage } from '@/src/views/recipe-details';

import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata | null> {
  const params = await props.params;
  return getMetadata(Number(params.slug));
}

async function Page(props: PageProps) {
  const params = await props.params;
  return <RecipeDetailsPage recipeId={Number(params.slug)} />;
}

export default Page;
