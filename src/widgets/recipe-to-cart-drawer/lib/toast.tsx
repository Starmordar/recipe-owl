// import { ToastAction } from '@/src/shared/ui/toast';

import type { ToasterToast } from '@/src/shared/ui/use-toast';

const successToast: Omit<ToasterToast, 'id'> = {
  title: 'The ingredients added to your cart.',
  // action: <ToastAction altText='Go to Cart'>Go to Cart</ToastAction>,
};

const alreadyInCartToast: Omit<ToasterToast, 'id'> = {
  title: 'This recipe is already in your cart.',
  variant: 'destructive',
};

export { successToast, alreadyInCartToast };
