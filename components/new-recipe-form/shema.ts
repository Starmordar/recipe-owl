import { z } from 'zod';
import { acceptedImageMimeTypes } from '@/constants/image';

const imageSchema = z.any().refine((file) => acceptedImageMimeTypes.includes(file.type), {
  message: 'Only .jpg, .jpeg, .png .avif and .webp formats are supported.',
});

const ingredientSchema = z.object({
  name: z.string().min(2, { message: 'Ingredient name must be at least 2 characters.' }),
  quantity: z.string().min(2, { message: 'Quantity must be at least 2 characters.' }),
});

const stepSchema = z.object({
  description: z.string(),
});

const schema = z.object({
  image: imageSchema,
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().max(300, { message: 'Description must be at 300 characters at most.' }),
  ingredients: z.array(ingredientSchema),
  steps: z.array(stepSchema),
});

export const defaultValues: z.infer<typeof schema> = {
  image: undefined,
  title: '',
  description: '',
  ingredients: [{ name: '', quantity: '' }],
  steps: [{ description: '' }],
};

export default schema;
