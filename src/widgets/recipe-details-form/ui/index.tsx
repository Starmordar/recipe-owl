'use client';

import { useCallback, useEffect } from 'react';

import { usePersistentForm } from '@/src/shared/lib/form/use-persistent-form';
import { RecipeDetailsPageSkeleton } from '@/src/views/recipe-details/ui/skeleton';

import { dbName, dbStores } from '../config/indexedDB';
import { useRecipeForm } from '../lib/use-recipe-form';
import { dbDataToFormValues, dataFields, allowedFields } from '../model/db-data-to-form-values';
import { recipeToFormValues } from '../model/recipe-to-form-values';
import { defaultValues } from '../model/schema';

import { RecipeForm } from './recipe-form';
import { RecipeFormHeader } from './recipe-form-header';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeProps {
  title: string;
  prevUrl?: string;
  recipe?: RecipeDetails;
}

function RecipeDetailsForm({ title, prevUrl, recipe }: RecipeProps) {
  const { form, onSubmit, isPending } = useRecipeForm(getFormProps());
  const imageField = form.getValues('image');

  const mapFields = useCallback((values: Record<string, unknown>) => {
    return dbDataToFormValues(values, allowedFields);
  }, []);

  const getDataFields = useCallback(() => {
    return dbDataToFormValues(form.getValues(), dataFields);
  }, [form]);

  const rehydrateFields = useCallback(
    (fields: Record<string, unknown>) => {
      return form.reset({ ...defaultValues, ...fields }, { keepDefaultValues: true });
    },
    [form],
  );

  const { isRehydrating, storeFiles } = usePersistentForm({
    dbName,
    stores: dbStores,
    rehydrateFields,
    getDataFields,
    mapFields,
  });

  useEffect(() => {
    if (isRehydrating || !imageField) return;
    storeFiles({ image: imageField });
  }, [isRehydrating, imageField, storeFiles]);

  function getFormProps() {
    if (!recipe) return {};
    return { recipeId: recipe.id, initialValues: recipeToFormValues(recipe) };
  }

  if (isRehydrating) return <RecipeDetailsPageSkeleton />;

  return (
    <>
      <RecipeFormHeader
        title={title}
        prevUrl={prevUrl}
        isPending={isPending}
        dataChanged={form.formState.isDirty}
      />

      <main className='page-container'>
        <RecipeForm form={form} onSubmit={onSubmit} />
      </main>
    </>
  );
}

export { RecipeDetailsForm };
