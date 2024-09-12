import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signIn } from '@/app/(auth)/actions';

import schema, { defaultValues } from '../constants/schema';

import type { FormValues } from '../constants/schema';

function useSignInForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: FormValues) {
    setPending(true);
    const result = await signIn(values).finally(() => setPending(false));
    if (result.error) form.setError('email', { message: result.error });
  }

  return { form, pending, onSubmit };
}

export default useSignInForm;
