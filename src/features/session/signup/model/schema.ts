import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { passwordSchema, emailSchema, fullNameSchema } from '@/src/entities/user';

function useSchema() {
  const t = useTranslations('AuthPage.Form.ClientErrors');

  const schema = z
    .object({
      fullName: fullNameSchema(t),
      email: emailSchema(t),
      password: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  return schema;
}

type FromValues = z.infer<ReturnType<typeof useSchema>>;

const defaultFormValues: FromValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export type { FromValues };
export { useSchema, defaultFormValues };
