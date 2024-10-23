import { queryOptions } from '@tanstack/react-query';

import { getCurrentUser } from './get-current-user';

const userQueries = {
  allKey: () => ['users'],

  currentKey: () => [...userQueries.allKey(), 'current'],
  current: () =>
    queryOptions({
      queryKey: [...userQueries.currentKey()],
      queryFn: getCurrentUser,
    }),
};

export { userQueries };
