'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { defaultValues, type FormValues } from './shema';

import { Form } from '@/components/ui/form';
import IngredientsFieldset from './components/ingredients-fieldset';
import StepsFieldset from './components/steps-fieldset';
import DetailsFieldset from './components/details-fieldset';

import { createRecipe } from '@/lib/data';

function RecipeDetailsForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: FormValues) {
    console.log('values :>> ', values);
    await createRecipe(values);
  }

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
