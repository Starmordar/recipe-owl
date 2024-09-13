'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import useSignInForm from './hooks/useSignInForm';

function SignInForm() {
  const { form, pending, onSubmit } = useSignInForm();

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

export default SignInForm;
