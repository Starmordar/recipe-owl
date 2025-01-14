import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { acceptedImageMimeTypes } from '@/src/shared/config/image';

function useSchema() {
  const t = useTranslations('RecipeFormPage.Form.ClientErrors');

  const ingredientSchema = z.object({
    id: z.any(),
    name: z.string().min(1, { message: t('ingredientNameRequired') }),
    unit: z.string().min(1, { message: t('ingredientQuantityRequired') }),
  });

  const stepSchema = z.object({
    description: z.string().min(1, { message: t('stepDescriptionRequired') }),
  });

  const schema = z.object({
    image: z
      .any()
      .refine(file => file !== undefined && file !== null, {
        message: t('noImage'),
      })
      .refine(file => typeof file === 'string' || acceptedImageMimeTypes.includes(file?.type), {
        message: t('forbiddenImageFormat'),
      }),
    title: z
      .string()
      .min(2, {
        message: t('titleMinChar', { len: 2 }),
      })
      .max(150, {
        message: t('titleMaxChar', { len: 150 }),
      }),
    description: z.string().max(1000, {
      message: t('descriptionMaxChar', { len: 1000 }),
    }),
    source: z.string(),
    cookTime: z.string(),
    tags: z.array(z.string()).max(8, { message: t('tagsMaxCount', { count: 8 }) }),
    ingredients: z.array(ingredientSchema).min(1, { message: t('ingredientsRequired') }),
    steps: z.array(stepSchema).min(1, { message: t('stepsRequired') }),
  });

  return schema;
}

type FormValues = z.infer<ReturnType<typeof useSchema>>;

const defaultValues: FormValues = {
  image: undefined,
  title: '',
  description: '',
  source: '',
  cookTime: '',
  tags: [],
  ingredients: [{ name: '', unit: '' }],
  steps: [{ description: '' }],
};

export type { FormValues };
export { defaultValues, useSchema };
