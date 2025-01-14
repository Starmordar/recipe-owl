import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';

import { createRecipe, updateRecipe } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { useRouter } from '@/src/shared/i18n/routing';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { toast } from '@/src/shared/ui/use-toast';

import { useSchema, defaultValues } from '../model/schema';
import { valuesToFormData } from '../model/values-to-form-data';

import type { FormValues } from '../model/schema';

interface UseRecipeFormOptions {
  recipeId?: number;
  initialValues?: FormValues;
}

function useRecipeForm({ recipeId, initialValues }: UseRecipeFormOptions) {
  const t = useTranslations('RecipeFormPage.Form.ServerErrors');
  const [createAction, isPendingCreate] = useServerAction(createRecipe);
  const [updateAction, isPendingUpdate] = useServerAction(updateRecipe);

  const router = useRouter();

  const schema = useSchema();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? defaultValues,
  });

  async function applyChanges(values: FormValues): Promise<{ id: number } | null> {
    const formData = valuesToFormData(values);

    try {
      const recipe = await (recipeId ? updateAction(recipeId, formData) : createAction(formData));
      // Update the form immediately to ensure the redirect after creation does not trigger the unsaved changes confirmation dialog.
      flushSync(() => form.reset({}, { keepValues: true }));

      return recipe ?? null;
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        variant: 'destructive',
        description: t('unexpectedError'),
        duration: 2000,
        title: JSON.stringify(error) as string,
      });
      return null;
    }
  }

  async function onSubmit(values: FormValues) {
    const recipe = await applyChanges(values);
    if (recipe) router.replace(publicUrls.recipe(recipe.id));
  }

  return { form, onSubmit, isPending: isPendingCreate || isPendingUpdate };
}

export { useRecipeForm };
