import { z } from 'zod';

import { passwordSchema, emailSchema, fullNameSchema } from '@/src/entities/user';

const schema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match. Please ensure both fields are identical.',
    path: ['confirmPassword'],
  });

type FromValues = z.infer<typeof schema>;

const defaultFormValues: FromValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export type { FromValues };
export { schema, defaultFormValues };
