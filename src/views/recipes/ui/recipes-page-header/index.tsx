import { RecipeSearch } from '@/src/features/recipe/recipe-search';
import AppHeader from '@/src/shared/ui/app-header';
import { RecipeFiltersDrawer } from '@/src/widgets/recipe-filters-drawer';

function RecipesPageHeader() {
  return (
    <AppHeader>
      <div className='flex flex-col w-full items-center gap-y-3'>
        <RecipeSearch />
        <RecipeFiltersDrawer />
      </div>
    </AppHeader>
  );
}

export { RecipesPageHeader };
