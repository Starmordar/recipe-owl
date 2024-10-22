import type { ToasterToast } from '@/shared/hooks/useToast';

type Toast = Omit<ToasterToast, 'id'>;
export const errorToast: Toast = {
  variant: 'destructive',
  title: 'Something went wrong.',
  description: 'There was a problem with your request.',
  duration: 2000,
};
