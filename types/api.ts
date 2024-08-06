import type { Recipe } from './recipe';

export interface GetRecipesResponse {
  recipes: Array<Recipe>;
}

export type GetRecipeResponse = Recipe | undefined;
