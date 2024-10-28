import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Incorrect Password' })
  .max(30, { message: 'Incorrect Password' })
  .regex(/[a-zA-Z]/, { message: 'Incorrect Password' })
  .regex(/\d/, { message: 'Incorrect Password' });

const loginFormSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const defaultLoginFormValues: LoginFormSchema = {
  email: '',
  password: '',
};

export type { LoginFormSchema };
export { loginFormSchema, defaultLoginFormValues };
