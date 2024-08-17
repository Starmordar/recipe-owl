'use client';

import { Form } from '@/components/ui/form';

import useRecipeForm from '../hooks/useRecipeForm';

import DetailsFieldset from './details-fieldset';
import IngredientsFieldset from './ingredients-fieldset';
import StepsFieldset from './steps-fieldset';

import type { FormValues } from '../constants/shema';

export interface RecipeFormProps {
  recipeId?: number;
  initialValues?: FormValues;
}

function RecipeForm({ recipeId, initialValues }: RecipeFormProps) {
  const { form, onSubmit } = useRecipeForm({ recipeId, initialValues });

  return (
    <Form {...form}>
      <form id='recipe-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <DetailsFieldset form={form} />
        <IngredientsFieldset form={form} />
        <StepsFieldset form={form} />
      </form>
    </Form>
  );
}

export default RecipeForm;
