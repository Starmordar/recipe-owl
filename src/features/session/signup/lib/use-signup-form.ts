import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUp } from '../api/signup';
import { schema, defaultFormValues } from '../model/schema';

import type { FromValues } from '../model/schema';

function useSignupForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<FromValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  });

  async function onSubmit(values: FromValues) {
    setPending(true);
    const result = await signUp(values).finally(() => setPending(false));
    if (result?.error) form.setError('email', { message: result.error });
  }

  return { form, pending, onSubmit };
}

export { useSignupForm };
