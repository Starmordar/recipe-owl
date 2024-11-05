import { z } from 'zod';

import { passwordSchema, emailSchema } from '@/src/entities/user';

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type FormValues = z.infer<typeof schema>;

const defaultFormValues: FormValues = {
  email: '',
  password: '',
};

export type { FormValues };
export { schema, defaultFormValues };
