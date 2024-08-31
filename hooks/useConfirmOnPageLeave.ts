import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface UseConfirmOnPageLeaveOptions {
  message: string;
  shouldTrigger: boolean;
}

function useConfirmOnPageLeave({ message, shouldTrigger }: UseConfirmOnPageLeaveOptions) {
  const router = useRouter();

  useEffect(() => {
    const originalPush = router.push;

    router.push = (url: string, options: NavigateOptions) => {
      if (!shouldTrigger) originalPush(url, options);
      else if (confirm(message)) originalPush(url, options);
    };

    return () => {
      router.push = originalPush;
    };
  }, [shouldTrigger, message, router]);
}

export default useConfirmOnPageLeave;
