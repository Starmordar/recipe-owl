'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useState } from 'react';

import { recipeQueries } from '@/src/entities/recipe';
import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';
import Search from '@/src/shared/ui/search';
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group';

interface TagsDrawerProps extends PropsWithChildren {
  value: Array<string>;
  onChange: (value: Array<string>) => void;
}

function TagsDrawer({ value, onChange, children }: TagsDrawerProps) {
  const t = useTranslations();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(value);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const { data: tags } = useQuery(recipeQueries.searchTags(debouncedSearchTerm, t));

  function handleOpenDrawer(open: boolean) {
    setIsDrawerOpen(open);

    if (!open) return;
    setSelectedTags(value);
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleOpenDrawer}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>{t('RecipeFormPage.AddTagsDrawer.title')}</DrawerTitle>
            <DrawerDescription className='sr-only'>
              {t('RecipeFormPage.AddTagsDrawer.description')}
            </DrawerDescription>
          </DrawerHeader>

          <div className='flex flex-col'>
            <div className='my-2'>
              <Search
                placeholder={t('RecipeFormPage.AddTagsDrawer.searchPlaceholder')}
                data={[]}
                searchTerm={searchTerm}
                setSearchTerm={nextValue => setSearchTerm(nextValue)}
                setSelected={() => {}}
                open={false}
                setOpen={() => {}}
              />
            </div>

            <div className='overflow-auto h-[60vh]'>
              <ToggleGroup
                value={selectedTags}
                onValueChange={setSelectedTags}
                type='multiple'
                variant='outline'
                className='flex flex-col flex-wrap items-start gap-4'
              >
                {tags?.map(tag => (
                  <div key={tag.type.value}>
                    <p className='mb-1 font-semibold text-lg'>{tag.type.title}</p>
                    <div className='flex flex-wrap justify-start gap-2'>
                      {tag.categories.map(({ title, value }) => (
                        <ToggleGroupItem
                          key={value}
                          value={value}
                          size='sm'
                          className='data-[state=on]:border-primary'
                        >
                          {title}
                        </ToggleGroupItem>
                      ))}
                    </div>
                  </div>
                ))}
              </ToggleGroup>
            </div>
          </div>

          <DrawerFooter className='flex flex-row w-full'>
            <DrawerClose className='flex-1' asChild>
              <Button className='w-full' variant='outline' onClick={() => onChange([])}>
                {t('RecipeFormPage.AddTagsDrawer.cancelAction')}
              </Button>
            </DrawerClose>

            <DrawerClose className='flex-1' asChild>
              <Button className='w-full' onClick={() => onChange(selectedTags)}>
                {t('RecipeFormPage.AddTagsDrawer.submitAction')}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { TagsDrawer };
