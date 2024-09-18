import { z } from 'zod';

const schema = z.object({
  ingredients: z.array(z.number()).refine(value => value.some(item => item), {
    message: 'You have to select at least one ingredient.',
  }),
});

export type FormValues = z.infer<typeof schema>;

export const defaultValues: FormValues = {
  ingredients: [],
};

export default schema;
