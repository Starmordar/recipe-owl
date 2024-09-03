import type { Ingredient, Recipe } from './recipe';

export interface GetRecipesResponse {
  recipes: Array<Recipe>;
}

export type GetRecipeResponse = Recipe | undefined;

export type GetIngredientsResponse = Array<Ingredient>;

export type GetCartResponse = Array<{ recipe: Recipe; ingredients: Array<Ingredient> }>;
