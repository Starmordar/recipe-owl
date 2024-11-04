'use client';

import { useRecipeForm } from '../lib/use-recipe-form';
import { recipeToFormValues } from '../model/recipe-to-form-values';

import { RecipeForm } from './recipe-form';
import { RecipeFormHeader } from './recipe-form-header';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeProps {
  title: string;
  prevUrl: string;
  recipe?: RecipeDetails;
}

function RecipeDetailsForm({ title, prevUrl, recipe }: RecipeProps) {
  const { form, onSubmit, isPending } = useRecipeForm(getFormProps());

  function getFormProps() {
    if (!recipe) return {};
    return { recipeId: recipe.id, initialValues: recipeToFormValues(recipe) };
  }

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
