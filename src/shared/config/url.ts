const publicUrls = {
  home: '/',
  profile: '/profile',

  cart: '/cart',
  cartWithToken: (token?: string | null) => (!token ? '/cart' : `/cart?shareToken=${token}`),

  recipes: '/recipes',
  recipe: (recipeId: number | string) => `/recipes/${recipeId}`,
  editRecipe: (recipeId: number | string) => `/recipes/${recipeId}/edit`,
  newRecipe: '/recipes/new',

  register: '/registration',
  registerWithEmail: '/registration/email',

  signUp: '/signUp',
  signIn: '/signin',
};

const apiUrls = {
  google_oauth: '/api/auth/google',
};

export { publicUrls, apiUrls };
