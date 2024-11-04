import { z } from 'zod';

const schema = z.object({
  ingredients: z.array(z.number()).refine(value => value.some(item => item), {
    message: 'You have to select at least one ingredient.',
  }),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  ingredients: [],
};

export type { FormValues };
export { schema, defaultValues };
