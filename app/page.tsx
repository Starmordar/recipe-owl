import { Suspense } from 'react';
import RecipePreviewCards from '@/components/recipe-preview-cards';
import RecipePreviewCardsSkeleton from '@/components/recipe-preview-cards/skeleton';

interface PageProps {
  searchParams: {
    search?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default function Page({ searchParams }: PageProps) {
  const search = searchParams?.search ?? '';

  return (
    <section>
      <Suspense key={JSON.stringify(searchParams)} fallback={<RecipePreviewCardsSkeleton />}>
        <RecipePreviewCards search={search} filters={searchParams} />
      </Suspense>
    </section>
  );
}
