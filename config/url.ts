const publicUrls = {
  home: '/',
  recipes: '/recipes',
  recipe: (recipeId: number | string) => `/recipes/${recipeId}`,
  newRecipe: '/recipes/new',
};

export { publicUrls };
