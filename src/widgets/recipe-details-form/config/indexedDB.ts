const dbName = 'recipe-owl';

const dbStores = {
  data: { name: 'recipe-data', params: { keyPath: 'id' } },
  files: { name: 'recipe-files', params: { keyPath: 'id' } },
};

export { dbName, dbStores };
