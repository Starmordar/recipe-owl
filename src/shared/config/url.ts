const publicUrls = {
  home: '/',
  profile: '/profile',

  cart: '/cart',
  cartWithToken: (token?: string | null) => (!token ? '/cart' : `/cart?shareToken=${token}`),

  recipes: '/recipes',
  recipesSearch: (query: string) => `/recipes/?${query}`,

  recipe: (recipeId: number | string) => `/recipes/${recipeId}`,
  editRecipe: (recipeId: number | string) => `/recipes/${recipeId}/edit`,
  newRecipe: '/recipes/new',

  register: '/registration',
  registerWithEmail: '/registration/email',

  // TODO: Add legal information to the pages
  termsOfService: '/legal/terms-of-service-agreement',
  privacyPolicy: '/legal/privacy-policy',

  signUp: '/signUp',
  signIn: '/signin',
};

const apiUrls = {
  google_oauth: '/api/auth/google',
};

export { publicUrls, apiUrls };
