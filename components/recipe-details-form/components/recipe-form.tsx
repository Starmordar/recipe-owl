'use client';

import usePageLeaveConfirmation from '@/shared/hooks/usePageLeaveConfirmation';
import { Form } from '@/shared/ui/form';

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
  usePageLeaveConfirmation({
    confirmationMessage: 'You have unsaved changes. Are you sure you want to leave?',
    shouldConfirm: form.formState.isDirty,
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
