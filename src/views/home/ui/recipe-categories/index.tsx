import { getTranslations } from 'next-intl/server';

import { publicUrls } from '@/src/shared/config/url';

import { getRecipeCategories } from '../../api/get-recipe-categories';
import { recipeCategoryGroups } from '../../config/recipe-category-groups';
import { RecipePreviewSection } from '../recipe-preview';

async function RecipeCategories() {
  const categories = await getRecipeCategories();
  const t = await getTranslations('RecipeTags');

  return (
    <>
      {categories.map(category => {
        const type = getCategoryType(category.tag);

        return (
          <RecipePreviewSection
            key={category.tag}
            sectionTitle={
              t.has(`Descriptions.${category.tag}`)
                ? t(`Descriptions.${category.tag}`)
                : category.title
            }
            subtitle={type && `${t(`Categories.${type}`)} · ${t(`Items.${category.tag}`)}`}
            seeAllUrl={
              type &&
              publicUrls.recipesSearch(new URLSearchParams({ [type]: category.tag }).toString())
            }
            recipes={category.recipes}
          />
        );
      })}
    </>
  );
}

function getCategoryType(tag: string) {
  return recipeCategoryGroups.find(({ categories }) => categories.some(item => item.tag === tag))
    ?.type;
}

export { RecipeCategories };
