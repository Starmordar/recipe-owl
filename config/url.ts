const publicUrls = {
  home: '/',
  cart: '/cart',
  recipes: '/recipes',
  recipe: (recipeId: number | string) => `/recipes/${recipeId}`,
  newRecipe: '/recipes/new',
};

export { publicUrls };
