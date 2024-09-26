import GroceryCart from '@/components/grocery-cart';
import IngredientsList from '@/components/grocery-cart/ingredients-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartWithRecipes } from '@/lib/data/cart';

interface ProfileTabsProps {
  cartWithRecipes: CartWithRecipes;
}

function CartTabs({ cartWithRecipes }: ProfileTabsProps) {
  return (
    <Tabs defaultValue='saved' className='relative mr-auto w-full'>
      <TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
        <TabsTrigger className='flex-1' value='saved'>
          Recipes
        </TabsTrigger>
        <TabsTrigger className='flex-1' value='yourRecipes'>
          All Ingredients
        </TabsTrigger>
      </TabsList>

      <TabsContent value='saved' className='px-4 pt-2'>
        <GroceryCart cartWithRecipes={cartWithRecipes} />
      </TabsContent>
      <TabsContent value='yourRecipes' className='px-4 pt-2'>
        <IngredientsList cartWithRecipes={cartWithRecipes} />
      </TabsContent>
    </Tabs>
  );
}

export default CartTabs;
