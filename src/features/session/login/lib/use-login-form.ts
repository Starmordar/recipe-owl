import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '../api/login';
import { defaultFormValues, useSchema } from '../model/schema';

import type { FormValues } from '../model/schema';

function useLoginForm() {
  const t = useTranslations('AuthPage.Form.ServerErrors');
  const [pending, setPending] = useState(false);

  const schema = useSchema();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  });

  async function onSubmit(values: FormValues) {
    setPending(true);
    const result = await login(values).finally(() => setPending(false));
    if (result?.error) {
      form.setError('root.globalError', {
        type: '400',
        message: t.has(result.error) ? t(result.error) : t('incorrectData'),
      });
    }
  }

  return { form, pending, onSubmit };
}

export { useLoginForm };
