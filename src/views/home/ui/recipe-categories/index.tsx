import { getRecipeCategories } from '../../api/get-recipe-categories';
import { RecipePreviewSection } from '../recipe-preview';

async function RecipeCategories() {
  const categories = await getRecipeCategories();

  return (
    <>
      {categories.map(category => (
        <RecipePreviewSection
          key={category.tag}
          sectionTitle={category.title}
          recipes={category.recipes}
        />
      ))}
    </>
  );
}

export { RecipeCategories };
