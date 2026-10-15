import { IDBPDatabase, openDB } from 'idb';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ObjectStore {
  name: string;
  params: IDBObjectStoreParameters;
}

interface UserPersistentFormOption {
  dbName: string;
  stores: { data: ObjectStore; files?: ObjectStore };
  // Identifies the form, so a draft saved for one form is never restored into another.
  draftKey: string;

  getDataFields: () => Record<string, unknown>;
  mapFields: (fields: Record<string, unknown>) => Record<string, unknown>;
  rehydrateFields: (fields: Record<string, unknown>) => void;
}

// Sometimes, the browser doesn't have enough time to store the entire file in IndexedDB before the page unloads.
// To address this, file fields are saved while the user interacts with the app, and data fields are saved during the unload event.
// The draft only has to survive a reload, so it's deleted once the user leaves the form within the app.
function usePersistentForm({
  dbName,
  stores,
  draftKey,
  getDataFields,
  mapFields,
  rehydrateFields,
}: UserPersistentFormOption) {
  const [isRehydrating, setIsRehydrating] = useState(true);

  // Any async work within the "visibilitychange" event may be interrupted by a page refresh or transition to a frozen state.
  // To handle this, we use "idb" for saving data before the unload event and "idbPromise" for other transactions.
  const idbPromise = useRef<Promise<IDBPDatabase> | null>(null);
  const idb = useRef<IDBPDatabase | null>(null);
  const unmountTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    async function openDBConnection() {
      if (idbPromise.current !== null) return;

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
  }, [dbName, stores]);

  useEffect(() => {
    function onVisibilityChange() {
      if (!idb.current || !document.hidden) return;

      const tx = idb.current.transaction(stores.data.name, 'readwrite');
      tx.store.put({ ...getDataFields(), id: draftKey });
      tx.commit();
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [stores, draftKey, getDataFields]);

  const deleteFiles = useCallback(async () => {
    const idb = await idbPromise.current;
    if (!idb) return;

    if (stores.files) {
      const tx = idb.transaction(stores.files.name, 'readwrite');
      await Promise.all([tx.store.delete(draftKey), tx.done]);
    }
  }, [stores, draftKey]);

  const clearStore = useCallback(async () => {
    const idb = await idbPromise.current;
    if (!idb) return;

    const tx = idb.transaction(stores.data.name, 'readwrite');
    await Promise.all([tx.store.delete(draftKey), tx.done]);

    await deleteFiles();
  }, [stores, draftKey, deleteFiles]);

  // Only the open form's draft is kept, so drafts left behind by other forms are deleted.
  const deleteOtherDrafts = useCallback(async () => {
    const idb = await idbPromise.current;
    if (!idb) return;

    const storeNames = stores.files ? [stores.data.name, stores.files.name] : [stores.data.name];
    const tx = idb.transaction(storeNames, 'readwrite');

    await Promise.all([
      ...storeNames.map(async storeName => {
        const store = tx.objectStore(storeName);
        const keys = await store.getAllKeys();
        await Promise.all(keys.filter(key => key !== draftKey).map(key => store.delete(key)));
      }),
      tx.done,
    ]);
  }, [stores, draftKey]);

  const getFieldsFromStore = useCallback(async () => {
    const db = await idbPromise.current;
    if (!db) return;

    const dataFields = await db.get(stores.data.name, draftKey);
    if (!stores.files) return mapFields(dataFields ?? {});

    const fileFields = await db.get(stores.files?.name, draftKey);

    // If there are file fields but no data fields, it indicates the page was navigated via back/forward
    // and the "visibilitychange" event was not triggered. In this case, we need to reset the existing files.
    if (!dataFields && fileFields) {
      await deleteFiles();
      return {};
    }

    return mapFields({ ...(dataFields ?? {}), ...(fileFields ?? {}) });
  }, [mapFields, deleteFiles, stores, draftKey]);

  useEffect(() => {
    async function setInitialValues() {
      await deleteOtherDrafts();

      const fields = await getFieldsFromStore();
      if (!fields || Object.keys(fields).length === 0) return setIsRehydrating(false);

      rehydrateFields(fields);
      setIsRehydrating(false);
    }

    setInitialValues();
  }, [rehydrateFields, getFieldsFromStore, deleteOtherDrafts]);

  const storeFiles = useCallback(
    async (files: Record<string, Blob | string>) => {
      const db = await idbPromise.current;
      if (!db || !stores.files) return;

      const tx = db.transaction(stores.files.name, 'readwrite');
      await Promise.all([tx.store.put({ ...files, id: draftKey }), tx.done]);
    },
    [stores, draftKey],
  );

  // Leaving the form within the app (a link, the back button, the redirect after saving) unmounts it,
  // while a reload or a discarded tab doesn't, so the draft is deleted on unmount.
  // The deletion waits a tick because Strict Mode unmounts and immediately remounts the form in development.
  useEffect(() => {
    window.clearTimeout(unmountTimeout.current);

    return () => {
      unmountTimeout.current = window.setTimeout(async () => {
        await clearStore();
        (await idbPromise.current)?.close();
      });
    };
  }, [clearStore]);

  return { isRehydrating, getFieldsFromStore, storeFiles };
}

export { usePersistentForm };
