import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Incorrect Password' })
  .max(30, { message: 'Incorrect Password' })
  .regex(/[a-zA-Z]/, { message: 'Incorrect Password' })
  .regex(/\d/, { message: 'Incorrect Password' });

const schema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type FormValues = z.infer<typeof schema>;

export const defaultValues: FormValues = {
  email: '',
  password: '',
};

export default schema;
