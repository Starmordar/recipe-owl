const publicUrls = {
  home: '/',
  profile: '/profile',

  cart: '/cart',
  cartWithToken: (token: string | null) => (!token ? '/cart' : `/cart?shareToken=${token}`),

  recipes: '/recipes',
  recipe: (recipeId: number | string) => `/recipes/${recipeId}`,
  newRecipe: '/recipes/new',

  register: '/registration',
  registerWithEmail: '/registration/email',

  signUp: '/signUp',
  signIn: '/signin',
};

export { publicUrls };
