import Cookies from 'js-cookie';

import { shareTokenCookieName } from '../config/share-token';

function storeShareToken(shareToken: string | undefined | null) {
  Cookies.set(shareTokenCookieName, shareToken ?? '', { path: '/' });
}

export { storeShareToken };
