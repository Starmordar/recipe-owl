'use client';

import { Form } from '@/components/ui/form';

import DetailsFieldset from './components/details-fieldset';
import IngredientsFieldset from './components/ingredients-fieldset';
import StepsFieldset from './components/steps-fieldset';
import useRecipeForm from './hooks/useRecipeForm';

import type { FormValues } from './constants/shema';

interface RecipeDetailsFromProps {
  recipeId?: number;
  initialValues?: FormValues;
}

function RecipeDetailsForm({ recipeId, initialValues }: RecipeDetailsFromProps) {
  const { form, onSubmit } = useRecipeForm({ recipeId, initialValues });

  return (
    <Form {...form}>
      <form id="create-recipe-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <DetailsFieldset form={form} />
        <IngredientsFieldset form={form} />
        <StepsFieldset form={form} />
      </form>
    </Form>
  );
}

export default RecipeDetailsForm;
