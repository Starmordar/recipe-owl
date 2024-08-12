import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(2, { message: 'Ingredient name must be at least 2 characters.' }),
  quantity: z.string().min(2, { message: 'Quantity must be at least 2 characters.' }),
});

const ingredientsSchema = z.object({
  ingredients: z.array(ingredientSchema),
  // .min(MIN_STUDENTS_LENGTH, {
  //   message: `You need to add at least ${MIN_STUDENTS_LENGTH} student`,
  // })
  // .max(MAX_STUDENTS_LENGTH, {
  //   message: `You can add at most ${MAX_STUDENTS_LENGTH} students`,
  // }),
});

const stepSchema = z.object({
  description: z.string(),
});

const schema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().max(300, { message: 'Description must be at 300 characters at most.' }),
  ingredients: z.array(ingredientSchema),
  steps: z.array(stepSchema),
});

export default schema;
