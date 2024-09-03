import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';

import { createRecipe, updateRecipe } from '@/app/(main)/recipes/actions';
import { useToast } from '@/components/ui/use-toast';
import { errorToast } from '@/constants/toast';

import schema, { defaultValues } from '../constants/shema';

import type { FormValues } from '../constants/shema';

interface UseRecipeFormOptions {
  recipeId?: number;
  initialValues?: FormValues;
}

function useRecipeForm({ recipeId, initialValues }: UseRecipeFormOptions) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? defaultValues,
  });

  function valuesToFormData(values: FormValues): FormData {
    const updated = { ...values, steps: values.steps.map(s => s.description) };
    const { image, ...data } = updated;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('data', JSON.stringify(data));

    return formData;
  }

  async function applyChanges(values: FormValues): Promise<{ id: number } | null> {
    const formData = valuesToFormData(values);

    try {
      const recipe = await (recipeId ? updateRecipe(recipeId, formData) : createRecipe(formData));
      // Update the form immediately to ensure the redirect after creation does not trigger the unsaved changes confirmation dialog.
      flushSync(() => form.reset({}, { keepValues: true }));
      return recipe;
    } catch {
      toast(errorToast);
      return null;
    }
  }

  async function onSubmit(values: FormValues) {
    const recipe = await applyChanges(values);
    if (recipe) router.push(`/recipes/${recipe.id}`);
  }

  return { form, onSubmit };
}

export default useRecipeForm;
