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

import { shrinkImage } from './shrink-image';

import type { FormValues } from '../model/schema';

// Next.js never answers a server action request over 1 MB, so the save would hang.
// Some room is left for the multipart encoding around the fields.
const maxRequestSize = 1024 * 1024 - 16 * 1024;

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
    try {
      // The photo may still be shrinking if Save is pressed right after picking it,
      // and a draft saved by an older version may hold a full-size photo.
      const image = values.image instanceof File ? await shrinkImage(values.image) : values.image;
      const formData = valuesToFormData({ ...values, image });

      // A shrunk photo always fits, but the original is sent when the browser couldn't decode it.
      if (getFormDataSize(formData) > maxRequestSize) {
        toast({ variant: 'destructive', title: t('recipeTooLarge'), duration: 2000 });
        return null;
      }

      const recipe = await (recipeId ? updateAction(recipeId, formData) : createAction(formData));
      // Update the form immediately to ensure the redirect after creation does not trigger the unsaved changes confirmation dialog.
      flushSync(() => form.reset({}, { keepValues: true }));

      return recipe ?? null;
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: t('unexpectedError'), duration: 2000 });
      return null;
    }
  }

  async function onSubmit(values: FormValues) {
    const recipe = await applyChanges(values);
    if (recipe) router.replace(publicUrls.recipe(recipe.id));
  }

  const isPending = form.formState.isSubmitting || isPendingCreate || isPendingUpdate;

  return { form, onSubmit, isPending };
}

function getFormDataSize(formData: FormData): number {
  let size = 0;
  for (const [, value] of formData) {
    size += typeof value === 'string' ? new Blob([value]).size : value.size;
  }

  return size;
}

export { useRecipeForm };
