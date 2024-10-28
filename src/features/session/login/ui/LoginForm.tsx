'use client';

import { Button } from '@/src/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { PasswordInput } from '@/src/shared/ui/password-input';

import { useLoginForm } from '../hooks/useLoginForm';

function LoginForm() {
  const { form, pending, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form id='signup-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder='Enter your email address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <PasswordInput placeholder='Enter your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='gap-2 w-full'
          type='submit'
          loading={pending}
          loadingText='Signing In... '
          loadingClassName='h-5 w-5'
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export { LoginForm };
