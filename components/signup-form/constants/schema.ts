import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(30, { message: 'Password cannot exceed 30 characters' })
  .regex(/[a-zA-Z]/, { message: 'Password must contain at least one alphabetic character' })
  .regex(/\d/, { message: 'Password must contain at least one number' });

const schema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters long.' })
      .max(100, { message: 'Full name cannot exceed 100 characters.' }),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match. Please ensure both fields are identical.',
    path: ['confirmPassword'],
  });

export type FormValues = z.infer<typeof schema>;

export const defaultValues: FormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default schema;
