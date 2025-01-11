import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { i18nConfig } from './config';

export const routing = defineRouting(i18nConfig);

export const {
  Link,
  redirect: _redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
export const redirect: typeof _redirect = _redirect;
