'use client';

import { useTranslations } from 'next-intl';

import { usePageLeaveConfirmation } from '@/src/shared/lib/use-page-leave-confirmation';
import { Form } from '@/src/shared/ui/form';

import { DetailsFieldset } from './details-fieldset';
import { IngredientsFieldset } from './ingredients-fieldset';
import { StepsFieldset } from './steps-fieldset';

import type { FormValues } from '../model/schema';
import type { UseFormReturn } from 'react-hook-form';

export interface RecipeFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
}

function RecipeForm({ form, onSubmit }: RecipeFormProps) {
  const t = useTranslations('RecipeFormPage');

  usePageLeaveConfirmation({
    confirmationMessage: t('confirmationOnLeaveText'),
    shouldConfirm: form.formState.isDirty,
  });

  return (
    <Form {...form}>
      <form id='recipe-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <DetailsFieldset form={form} />
        <IngredientsFieldset form={form} />
        <StepsFieldset form={form} />
      </form>
    </Form>
  );
}

export { RecipeForm };
