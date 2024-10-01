import RecipeFilters from '../../recipe-filters';
import RecipeSearch from '../../recipe-search';
import AppHeader from '../app-header';

function RecipesHeader() {
  return (
    <AppHeader>
      <div className='flex w-full items-center gap-x-2'>
        <RecipeSearch />
        <RecipeFilters />
      </div>
    </AppHeader>
  );
}

export default RecipesHeader;
