import { useTranslations } from 'next-intl';
import { z } from 'zod';

function useSchema() {
  const t = useTranslations('RecipeDetailsPage.AddToCartDrawer.ClientErrors');

  const schema = z.object({
    ingredients: z.array(z.number()).refine(value => value.some(item => item), {
      message: t('selectAtLeastOneIngredient'),
    }),
  });

  return schema;
}

type FormValues = z.infer<ReturnType<typeof useSchema>>;

const defaultValues: FormValues = {
  ingredients: [],
};

export type { FormValues };
export { useSchema, defaultValues };
