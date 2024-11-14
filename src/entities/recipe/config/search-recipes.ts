const ingredientsCategory = 'ingredients';
const onlySavedCategory = 'only-saved';

const tagsCategories = [
  'Ingredients',
  'Mood',
  'Cuisine',
  'Nutrition',
  'Main Ingredient',
  'Complexity',
  'Time',
];

const filterCategories = [ingredientsCategory, onlySavedCategory, ...tagsCategories];

export { ingredientsCategory, onlySavedCategory, tagsCategories, filterCategories };
