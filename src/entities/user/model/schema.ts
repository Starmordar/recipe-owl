import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .max(30, { message: 'Password must not exceed 30 characters.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/\d/, { message: 'Password must contain at least one number.' });

const emailSchema = z.string().trim().email({ message: 'Please enter a valid email address.' });

const fullNameSchema = z
  .string()
  .min(2, { message: 'Full name must be at least 2 characters long.' })
  .max(100, { message: 'Full name cannot exceed 100 characters.' })
  .regex(/^[a-zA-Z\s]*$/, { message: 'Full name can only contain letters and spaces.' });

export { passwordSchema, emailSchema, fullNameSchema };
