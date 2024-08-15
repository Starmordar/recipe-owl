'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { defaultValues, type FormValues } from './shema';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import IngredientsFieldset from './components/ingredients-fieldset';
import StepsFieldset from './components/steps-fieldset';
import DetailsFieldset from './components/details-fieldset';

import { createRecipe } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import { errorToast } from '@/constants/toast';

function RecipeDetailsForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: FormValues) {
    console.log('values :>> ', values);

    const recipe = await createRecipe(values).catch(() => toast(errorToast));
    if (recipe) router.push(`/recipes/${recipe.id}`);
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
