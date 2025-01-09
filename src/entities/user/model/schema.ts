import { useTranslations } from 'next-intl';
import { z } from 'zod';

function passwordSchema(t: ReturnType<typeof useTranslations>) {
  return z
    .string()
    .min(8, { message: t('passwordMinChar', { len: 8 }) })
    .max(30, { message: t('passwordMaxChar', { len: 30 }) })
    .regex(/[a-z]/, { message: t('passwordOneLowercase') })
    .regex(/[A-Z]/, { message: t('passwordOneUppercase') })
    .regex(/\d/, { message: t('passwordOneNumber') });
}

function emailSchema(t: ReturnType<typeof useTranslations>) {
  return z
    .string()
    .trim()
    .email({ message: t('emailInvalidFormat') });
}

function fullNameSchema(t: ReturnType<typeof useTranslations>) {
  return z
    .string()
    .min(2, { message: t('fullnameMinChar', { len: 2 }) })
    .max(100, { message: t('fullnameMaxChar', { len: 100 }) })
    .regex(/^[a-zA-Z\s]*$/, { message: t('fullNameForbiddenChar') });
}

export { passwordSchema, emailSchema, fullNameSchema };
