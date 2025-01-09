'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/src/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { PasswordInput } from '@/src/shared/ui/password-input';

import { useSignupForm } from '../lib/use-signup-form';

function SignupForm() {
  const t = useTranslations('AuthPage');
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
                <Input placeholder={t('fullnamePlaceholder')} {...field} />
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
                <Input placeholder={t('emailPlaceholder')} {...field} />
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
                <PasswordInput placeholder={t('createPasswordPlaceholder')} {...field} />
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
                <PasswordInput placeholder={t('confirmPasswordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='gap-2 w-full'
          type='submit'
          loading={pending}
          loadingText={t('signUpPending')}
          loadingClassName='h-5 w-5'
        >
          {t('signUpLink')}
        </Button>
      </form>
    </Form>
  );
}

export { SignupForm };
