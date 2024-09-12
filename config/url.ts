const publicUrls = {
  home: '/',
  profile: '/profile',
  cart: '/cart',
  recipes: '/recipes',
  recipe: (recipeId: number | string) => `/recipes/${recipeId}`,
  newRecipe: '/recipes/new',

  register: '/registration',
  registerWithEmail: '/registration/email',

  signUp: '/signUp',
  signIn: '/signIn',
};

export { publicUrls };
