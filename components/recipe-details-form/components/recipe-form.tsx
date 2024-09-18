'use client';

import { Form } from '@/components/ui/form';
import useConfirmOnPageLeave from '@/hooks/useConfirmOnPageLeave';

import useRecipeForm from '../hooks/useRecipeForm';

import DetailsFieldset from './details-fieldset';
import IngredientsFieldset from './ingredients-fieldset/index';
import StepsFieldset from './steps-fieldset';

import type { FormValues } from '../constants/shema';

export interface RecipeFormProps {
  recipeId?: number;
  initialValues?: FormValues;
}

function RecipeForm({ recipeId, initialValues }: RecipeFormProps) {
  const { form, onSubmit } = useRecipeForm({ recipeId, initialValues });

  useConfirmOnPageLeave({
    shouldTrigger: form.formState.isDirty,
    message: 'You have unsaved changes. Are you sure you want to leave?',
  });

  return (
    <Form {...form}>
      <form id='recipe-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <DetailsFieldset form={form} />
        <IngredientsFieldset form={form} />
        <StepsFieldset form={form} />
      </form>
    </Form>
  );
}

export default RecipeForm;
