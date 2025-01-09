import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { passwordSchema, emailSchema } from '@/src/entities/user';

function useSchema() {
  const t = useTranslations('AuthForm.ClientErrors');

  const schema = z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
  });

  return schema;
}

type FormValues = z.infer<ReturnType<typeof useSchema>>;

const defaultFormValues: FormValues = {
  email: '',
  password: '',
};

export type { FormValues };
export { useSchema, defaultFormValues };
