import { getRecipesByTag } from '../api/get-recipes-by-tag';

import { RecipePreviewSection } from './recipe-preview';

interface RecipesByTagSectionProps {
  sectionTitle: string;
  tagName: string;
}

async function RecipesByTagSection({ sectionTitle, tagName }: RecipesByTagSectionProps) {
  const recipes = await getRecipesByTag(tagName);
  if (recipes.length === 0) return null;

  return <RecipePreviewSection sectionTitle={sectionTitle} recipes={recipes} />;
}

export { RecipesByTagSection };
