'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/src/shared/ui/alert';
import { Button } from '@/src/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { PasswordInput } from '@/src/shared/ui/password-input';

import { useLoginForm } from '../lib/use-login-form';

function LoginForm() {
  const { form, pending, onSubmit } = useLoginForm();
  const globalError = form.formState.errors.root?.globalError ?? {};

  return (
    <Form {...form}>
      <form id='signup-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        {globalError.type === '400' && (
          <Alert variant='destructive'>
            <AlertCircle className='h-5 w-5' />
            <AlertTitle>Validation Error</AlertTitle>
            <AlertDescription>{globalError.message}</AlertDescription>
          </Alert>
        )}

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
