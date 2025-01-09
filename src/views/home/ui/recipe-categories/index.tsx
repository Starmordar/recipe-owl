import { getTranslations } from 'next-intl/server';

import { getRecipeCategories } from '../../api/get-recipe-categories';
import { RecipePreviewSection } from '../recipe-preview';

async function RecipeCategories() {
  const categories = await getRecipeCategories();
  const t = await getTranslations('RecipeTags.Descriptions');

  return (
    <>
      {categories.map(category => (
        <RecipePreviewSection
          key={category.tag}
          sectionTitle={t.has(category.tag) ? t(category.tag) : category.title}
          recipes={category.recipes}
        />
      ))}
    </>
  );
}

export { RecipeCategories };
