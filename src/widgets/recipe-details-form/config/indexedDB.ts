const dbName = 'recipe-owl';

const dbStores = {
  data: { name: 'recipe-data', entryKey: 'recordId', params: { keyPath: 'id' } },
  files: { name: 'recipe-files', entryKey: 'recordId', params: { keyPath: 'id' } },
};

export { dbName, dbStores };
