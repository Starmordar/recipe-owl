import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '../model/login';
import { defaultLoginFormValues, loginFormSchema } from '../model/schema';

import type { LoginFormSchema } from '../model/schema';

function useLoginForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultLoginFormValues,
  });

  async function onSubmit(values: LoginFormSchema) {
    setPending(true);
    const result = await login(values).finally(() => setPending(false));
    if (result?.error) form.setError('email', { message: result.error });
  }

  return { form, pending, onSubmit };
}

export { useLoginForm };
