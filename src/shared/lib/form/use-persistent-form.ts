import { IDBPDatabase, openDB } from 'idb';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ObjectStore {
  name: string;
  entryKey: string;
  params: IDBObjectStoreParameters;
}

interface UserPersistentFormOption {
  dbName: string;
  stores: { data: ObjectStore; files?: ObjectStore };

  getDataFields: () => Record<string, unknown>;
  mapFields: (fields: Record<string, unknown>) => Record<string, unknown>;
  rehydrateFields: (fields: Record<string, unknown>) => void;
}

// Sometimes, the browser doesn't have enough time to store the entire file in IndexedDB before the page unloads.
// To address this, file fields are saved while the user interacts with the app, and data fields are saved during the unload event.
function usePersistentForm({
  dbName,
  stores,
  getDataFields,
  mapFields,
  rehydrateFields,
}: UserPersistentFormOption) {
  const router = useRouter();
  const [isRehydrating, setIsRehydrating] = useState(true);

  // Any async work within the "visibilitychange" event may be interrupted by a page refresh or transition to a frozen state.
  // To handle this, we use "idb" for saving data before the unload event and "idbPromise" for other transactions.
  const idbPromise = useRef<Promise<IDBPDatabase> | null>(null);
  const idb = useRef<IDBPDatabase | null>(null);

  useEffect(() => {
    const idbRef = idb.current;

    async function openDBConnection() {
      if (idb.current !== null) return;

      idbPromise.current = openDB(dbName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(stores.data.name)) {
            db.createObjectStore(stores.data.name, stores.data.params);
          }
          if (stores.files && !db.objectStoreNames.contains(stores.files.name)) {
            db.createObjectStore(stores.files.name, stores.files.params);
          }
        },
      });

      idb.current = await idbPromise.current;
    }

    openDBConnection();

    return () => {
      idbRef?.close();
    };
  }, [dbName, stores]);

  useEffect(() => {
    function onVisibilityChange() {
      if (!idb.current || !document.hidden) return;

      const tx = idb.current.transaction(stores.data.name, 'readwrite');
      tx.store.put({ ...getDataFields(), id: stores.data.entryKey });
      tx.commit();
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [stores, getDataFields]);

  const deleteFiles = useCallback(async () => {
    const idb = await idbPromise.current;
    if (!idb) return;

    if (stores.files) {
      const tx = idb.transaction(stores.files.name, 'readwrite');
      await Promise.all([tx.store.delete(stores.files.entryKey), tx.done]);
    }
  }, [stores]);

  const clearStore = useCallback(async () => {
    const idb = await idbPromise.current;
    if (!idb) return;

    const tx = idb.transaction(stores.data.name, 'readwrite');
    await Promise.all([tx.store.delete(stores.data.entryKey), tx.done]);

    await deleteFiles();
  }, [stores, deleteFiles]);

  const getFieldsFromStore = useCallback(async () => {
    const db = await idbPromise.current;
    if (!db) return;

    const dataFields = await db.get(stores.data.name, stores.data.entryKey);
    if (!stores.files) return mapFields(dataFields ?? {});

    const fileFields = await db.get(stores.files?.name, stores.files.entryKey);

    // If there are file fields but no data fields, it indicates the page was navigated via back/forward
    // and the "visibilitychange" event was not triggered. In this case, we need to reset the existing files.
    if (!dataFields && fileFields) {
      await deleteFiles();
      return {};
    }

    return mapFields({ ...(dataFields ?? {}), ...(fileFields ?? {}) });
  }, [mapFields, deleteFiles, stores]);

  useEffect(() => {
    async function setInitialValues() {
      const fields = await getFieldsFromStore();
      if (!fields || Object.keys(fields).length === 0) return setIsRehydrating(false);

      rehydrateFields(fields);
      setIsRehydrating(false);
    }

    setInitialValues();
  }, [rehydrateFields, getFieldsFromStore]);

  const storeFiles = useCallback(
    async (files: Record<string, Blob | string>) => {
      const db = await idbPromise.current;
      if (!db || !stores.files) return;

      const tx = db.transaction(stores.files.name, 'readwrite');
      await Promise.all([tx.store.put({ ...files, id: stores.files.entryKey }), tx.done]);
    },
    [stores],
  );

  useLayoutEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = function (url: string, options?: NavigateOptions) {
      clearStore();
      originalPush(url, options);
    };

    router.replace = function (url: string, options?: NavigateOptions) {
      clearStore();
      originalReplace(url, options);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router, clearStore]);

  return { isRehydrating, getFieldsFromStore, storeFiles };
}

export { usePersistentForm };
