const searchFilter = 'Search';
const ingredientsCategory = 'Ingredients';
const onlySavedCategory = 'Only Saved';

const tagsCategories = ['Mood', 'Cuisine', 'Nutrition', 'Complexity', 'Time'];

const quickFilterCategories = [ingredientsCategory, ...tagsCategories];
const filterCategories = [ingredientsCategory, onlySavedCategory, ...tagsCategories];

export {
  searchFilter,
  ingredientsCategory,
  onlySavedCategory,
  quickFilterCategories,
  tagsCategories,
  filterCategories,
};
