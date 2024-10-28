import AppHeader from '@/src/shared/ui/app-header';

import RecipeFilters from '../../recipe-filters';
import RecipeSearch from '../../recipe-search';

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
