import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '../api/login';
import { defaultFormValues, schema } from '../model/schema';

import type { FormValues } from '../model/schema';

function useLoginForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  });

  async function onSubmit(values: FormValues) {
    setPending(true);
    const result = await login(values).finally(() => setPending(false));
    if (result?.error) form.setError('root.globalError', { type: '400', message: result.error });
  }

  return { form, pending, onSubmit };
}

export { useLoginForm };
