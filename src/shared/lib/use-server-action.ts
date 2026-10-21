import { useTransition } from 'react';

// Runs a server action inside a transition, so isPending stays true until the action settles.
// Every call gets its own promise, so an earlier result or error never leaks into a later call.
function useServerAction<P extends Array<unknown>, R>(
  action: (...args: P) => Promise<R>,
): [(...args: P) => Promise<R | undefined>, boolean] {
  const [isPending, startTransition] = useTransition();

  function runAction(...args: P): Promise<R | undefined> {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          resolve(await action(...args));
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  return [runAction, isPending];
}

export { useServerAction };
