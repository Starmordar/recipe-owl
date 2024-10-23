import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signupSchema, defaultSignUpFormValues } from '../model/schema';
import { signUp } from '../model/signUp';

import type { SignUpFormSchema } from '../model/schema';

function useSignupForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignUpFormValues,
  });

  async function onSubmit(values: SignUpFormSchema) {
    setPending(true);
    const result = await signUp(values).finally(() => setPending(false));
    if (result?.error) form.setError('email', { message: result.error });
  }

  return { form, pending, onSubmit };
}

export { useSignupForm };
