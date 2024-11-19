import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface UsePageLeaveConfirmationOptions {
  confirmationMessage: string;
  shouldConfirm: boolean;
}

function usePageLeaveConfirmation({
  confirmationMessage,
  shouldConfirm,
}: UsePageLeaveConfirmationOptions) {
  const router = useRouter();

  useEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (url: string, options: NavigateOptions) => {
      if (!shouldConfirm) originalPush(url, options);
      else if (confirm(confirmationMessage)) originalPush(url, options);
    };

    router.replace = (url: string, options: NavigateOptions) => {
      if (!shouldConfirm) originalReplace(url, options);
      else if (confirm(confirmationMessage)) originalReplace(url, options);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [shouldConfirm, confirmationMessage, router]);
}

export { usePageLeaveConfirmation };
