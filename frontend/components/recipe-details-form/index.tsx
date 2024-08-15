'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { defaultValues, type FormValues } from './constants/shema';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import IngredientsFieldset from './components/ingredients-fieldset';
import StepsFieldset from './components/steps-fieldset';
import DetailsFieldset from './components/details-fieldset';

import { createRecipe } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import { errorToast } from '@/constants/toast';
import useRecipeForm from './hooks/useRecipeForm';

interface RecipeDetailsFromProps {
  recipeId?: number;
  initialValues?: FormValues;
}

function RecipeDetailsForm({ recipeId, initialValues }: RecipeDetailsFromProps) {
  const { toast } = useToast();
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
