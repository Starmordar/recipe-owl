import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUp } from '../api/signup';
import { defaultFormValues, useSchema } from '../model/schema';

import type { FromValues } from '../model/schema';

function useSignupForm() {
  const t = useTranslations('AuthPage.Form.ServerErrors');
  const [pending, setPending] = useState(false);

  const schema = useSchema();
  const form = useForm<FromValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  });

  async function onSubmit(values: FromValues) {
    setPending(true);
    const result = await signUp(values).finally(() => setPending(false));
    if (result?.error) {
      form.setError('email', {
        message: t.has(result.error) ? t(result.error) : t('emailIsAlreadyInUse'),
      });
    }
  }

  return { form, pending, onSubmit };
}

export { useSignupForm };
