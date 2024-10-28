'use client';

import RecipeDetailsFormHeader from '../layout/recipe-details-form-header';

import RecipeForm from './components/recipe-form';
import useRecipeForm from './hooks/useRecipeForm';
import { recipeToFormValues } from './utils/recipeToFormValues';

import type { RecipeDetails } from '@/entities/recipe';

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
      <RecipeDetailsFormHeader
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

export default RecipeDetailsForm;
