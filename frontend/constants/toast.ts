import type { ToasterToast } from '@/components/ui/use-toast';

type Toast = Omit<ToasterToast, 'id'>;
export const errorToast: Toast = {
  variant: 'destructive',
  title: 'Something went wrong.',
  description: 'There was a problem with your request.',
};
