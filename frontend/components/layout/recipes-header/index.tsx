import RecipeFilters from '../../recipe-filters';
import RecipeSearch from '../../recipe-search';
import AppHeader from '../app-header';

function RecipesHeader() {
  return (
    <AppHeader>
      <RecipeSearch />
      <RecipeFilters />
    </AppHeader>
  );
}

export default RecipesHeader;
