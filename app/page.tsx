import React from 'react';

import { getRecipesPreview } from '@/lib/data';
import RecipePreviewCard from '@/components/recipe-preview-card';

export default async function Page() {
  const data = await getRecipesPreview('');

  return (
    <React.Fragment>
      <div className="px-2 py-4 grid grid-cols-2 gap-4">
        {(data.recipes ?? []).map((recipe) => (
          <RecipePreviewCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </React.Fragment>
  );
}
