'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './shema';

import { Form } from '@/components/ui/form';
import IngredientsFieldset from './components/ingredients-fieldset';
import StepsFieldset from './components/steps-fieldset';
import DetailsFieldset from './components/details-fieldset';

export function NewRecipeForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: undefined,
      title: '',
      description: '',
      ingredients: [{ name: '', quantity: '' }],
      steps: [{ description: '' }],
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log('values :>> ', values);
    console.log(values);
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
