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

    router.push = (url: string, options: NavigateOptions) => {
      if (!shouldConfirm) originalPush(url, options);
      else if (confirm(confirmationMessage)) originalPush(url, options);
    };

    return () => {
      router.push = originalPush;
    };
  }, [shouldConfirm, confirmationMessage, router]);
}

export { usePageLeaveConfirmation };
