'use client';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';

import useSignupForm from './hooks/useSignupForm';

function SignupForm() {
  const { form, pending, onSubmit } = useSignupForm();

  return (
    <Form {...form}>
      <form id='signup-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder='Enter a full name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <PasswordInput placeholder='Create a password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <PasswordInput placeholder='Enter your password again' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='gap-2 w-full'
          type='submit'
          loading={pending}
          loadingText='Creating an Account... '
          loadingClassName='h-5 w-5'
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default SignupForm;
