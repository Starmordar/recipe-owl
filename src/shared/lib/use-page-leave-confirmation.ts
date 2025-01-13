import { useEffect } from 'react';

import { useRouter } from '@/src/shared/i18n/routing';

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
  type RouterParams = Parameters<typeof router.push>;

  useEffect(() => {
    function getGuarded(
      href: RouterParams[0],
      options: RouterParams[1],
      original: (href: RouterParams[0], options?: RouterParams[1]) => void,
    ) {
      navigationCallback?.();

      if (!shouldConfirm) original(href, options);
      else if (confirm(confirmationMessage)) original(href, options);
    }

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (href: RouterParams[0], options: RouterParams[1]) =>
      getGuarded(href, options, originalPush);
    router.replace = (href: RouterParams[0], options: RouterParams[1]) =>
      getGuarded(href, options, originalReplace);

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
