'use client';

import { Form } from '@/components/ui/form';
import useConfirmOnPageLeave from '@/hooks/useConfirmOnPageLeave';

import DetailsFieldset from './details-fieldset';
import IngredientsFieldset from './ingredients-fieldset/index';
import StepsFieldset from './method-fieldset';

import type { FormValues } from '../constants/shema';
import type { UseFormReturn } from 'react-hook-form';

export interface RecipeFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
}

function RecipeForm({ form, onSubmit }: RecipeFormProps) {
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
