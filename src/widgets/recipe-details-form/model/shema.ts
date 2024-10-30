import { z } from 'zod';

import { acceptedImageMimeTypes } from '@/src/entities/image/config';

const ingredientSchema = z.object({
  id: z.any(),
  name: z.string().min(1, { message: 'Ingredient is required.' }),
  unit: z.string().min(1, { message: 'Quantity.' }),
});

const stepSchema = z.object({
  description: z.string().min(1, { message: 'Description is required.' }),
});

const schema = z.object({
  image: z
    .any()
    .refine(file => file !== undefined && file !== null, {
      message: 'Please upload an image of your recipe',
    })
    .refine(file => typeof file === 'string' || acceptedImageMimeTypes.includes(file?.type), {
      message: 'Only .jpg, .jpeg, .png .avif and .webp formats are supported.',
    }),
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(150, {
      message: 'Title should be no longer than 150 characters.',
    }),
  description: z.string().max(1000, {
    message: 'Description should be no longer than 1000 characters.',
  }),
  source: z.string(),
  ingredients: z
    .array(ingredientSchema)
    .min(1, { message: 'The recipe must include at least one ingredient.' }),
  steps: z.array(stepSchema).min(1, { message: 'At least one step is required for the recipe.' }),
});

type FormValues = z.infer<typeof schema>;
type FormDataValues = Omit<FormValues, 'image'>;

const defaultValues: FormValues = {
  image: undefined,
  title: '',
  description: '',
  source: '',
  ingredients: [{ name: '', unit: '' }],
  steps: [{ description: '' }],
};

export type { FormValues, FormDataValues };
export { defaultValues, schema };
