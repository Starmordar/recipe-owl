import { useEffect } from 'react';

import { useRouter } from '@/src/shared/i18n/routing';

import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface UsePageLeaveConfirmationOptions {
  confirmationMessage: string;
  shouldConfirm: boolean;
  navigationCallback?: () => void;
}

function usePageLeaveConfirmation({
  confirmationMessage,
  shouldConfirm,
  navigationCallback,
}: UsePageLeaveConfirmationOptions) {
  const router = useRouter();

  useEffect(() => {
    function getGuarded(
      url: string,
      options: NavigateOptions,
      original: (href: string, options?: NavigateOptions) => void,
    ) {
      navigationCallback?.();

      if (!shouldConfirm) original(url, options);
      else if (confirm(confirmationMessage)) original(url, options);
    }

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (url: string, options: NavigateOptions) => getGuarded(url, options, originalPush);
    router.replace = (url: string, options: NavigateOptions) =>
      getGuarded(url, options, originalReplace);

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [shouldConfirm, confirmationMessage, navigationCallback, router]);

  // useEffect(() => {
  //   function handleBeforeUnload(evt: BeforeUnloadEvent) {
  //     if (shouldConfirm) {
  //       evt.preventDefault();
  //       evt.returnValue = '';
  //       return;
  //     }
  //   }

  //   function handlePopState(evt: PopStateEvent) {
  //     if (shouldConfirm && typeof window !== 'undefined') {
  //       window.history.pushState(null, document.title, window.location.href);

  //       confirmationFn.current = () => {
  //         router.push(backHref);
  //       };

  //       setLeavingPage(true);
  //     } else {
  //       if (typeof window !== 'undefined') window.history.back();
  //     }
  //   }

  //   window.addEventListener('popstate', handlePopState);
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [shouldConfirm]);
}

export { usePageLeaveConfirmation };
