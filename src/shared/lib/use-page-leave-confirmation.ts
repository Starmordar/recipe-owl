// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useRouter as useBaseRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  const baseRouter = useBaseRouter();
  type RouterParams = Parameters<typeof baseRouter.push>;

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

    const originalPush = baseRouter.push;
    const originalReplace = baseRouter.replace;

    baseRouter.push = (href: RouterParams[0], options: RouterParams[1]) =>
      getGuarded(href, options, originalPush);
    baseRouter.replace = (href: RouterParams[0], options: RouterParams[1]) =>
      getGuarded(href, options, originalReplace);

    return () => {
      baseRouter.push = originalPush;
      baseRouter.replace = originalReplace;
    };
  }, [shouldConfirm, confirmationMessage, navigationCallback, baseRouter]);

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
