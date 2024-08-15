import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';
import type { FormValues } from '../constants/shema';
import schema, { defaultValues } from '../constants/shema';
import { createRecipe, updateRecipe } from '@/lib/data';
import { errorToast } from '@/constants/toast';
import type { Recipe } from '@/types/recipe';
import { useRouter } from 'next/navigation';

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

  async function applyChanges(values: FormValues): Promise<Recipe | void> {
    if (recipeId) {
      return updateRecipe(recipeId, values).catch(() => {
        toast(errorToast);
      });
    }

    return createRecipe(values).catch(() => {
      toast(errorToast);
    });
  }

  async function onSubmit(values: FormValues) {
    const recipe = await applyChanges(values);
    if (recipe) router.push(`/recipes/${recipe.id}`);
  }

  return { form, onSubmit };
}

export default useRecipeForm;
