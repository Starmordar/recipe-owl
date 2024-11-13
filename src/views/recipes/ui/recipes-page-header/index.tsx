import { RecipeSearch } from '@/src/features/recipe/recipe-search';
import AppHeader from '@/src/shared/ui/app-header';
import { RecipeFiltersDrawer } from '@/src/widgets/recipe-filters-drawer';

function RecipesPageHeader() {
  return (
    <AppHeader>
      <div className='flex w-full items-center gap-x-2'>
        <RecipeSearch />
        {/* <RecipeFiltersDrawer /> */}
      </div>
    </AppHeader>
  );
}

export { RecipesPageHeader };
