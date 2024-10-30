import { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
import { RecipesPageSkeleton } from '@/src/views/recipes';

import { SavedRecipes } from './saved-recipes';

import type { User } from 'lucia';

interface ProfileTabsProps {
  user: User;
}

function ProfileTabs({ user }: ProfileTabsProps) {
  return (
    <Tabs defaultValue='saved' className='relative mr-auto w-full'>
      <TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
        <TabsTrigger className='flex-1' value='saved'>
          Saved
        </TabsTrigger>
        <TabsTrigger className='flex-1' value='yourRecipes'>
          Your Recipes
        </TabsTrigger>
      </TabsList>

      <TabsContent value='saved'>
        <Suspense fallback={<RecipesPageSkeleton />}>
          <SavedRecipes user={user} />
        </Suspense>
      </TabsContent>

      <TabsContent value='yourRecipes'>Recipes here</TabsContent>
    </Tabs>
  );
}

export { ProfileTabs };
