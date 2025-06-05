import { useEffect, useRef, useState, useTransition } from 'react';

function useServerAction<P extends Array<unknown>, R>(
  action: (...args: P) => Promise<R>,
): [(...args: P) => Promise<R | undefined>, boolean] {
  const [result, setResult] = useState<R>();
  const [error, setError] = useState<unknown>();

  const [finished, setFinished] = useState(false);

  const [isPending, startTransition] = useTransition();
  const resolver = useRef<{
    resolve: (value?: R | PromiseLike<R>) => void;
    reject: (reason?: unknown) => void;
  }>(undefined);

  async function runAction(...args: P): Promise<R | undefined> {
    startTransition(() => {
      action(...args)
        .then(setResult)
        .catch(setError)
        .finally(() => setFinished(true));
    });

    return new Promise((resolve, reject) => (resolver.current = { resolve, reject }));
  }

  useEffect(() => {
    if (!finished) return;

    if (error) resolver.current?.reject(error);
    else resolver.current?.resolve(result);
  }, [result, error, finished]);

  return [runAction, isPending];
}

export { useServerAction };
