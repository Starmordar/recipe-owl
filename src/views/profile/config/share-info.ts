import { useTranslations } from 'next-intl';

import type { User } from 'lucia';

const profileShareInfo = (user: User, t: ReturnType<typeof useTranslations>) => ({
  title: t('ProfilePage.shareUserTitle', { username: user.fullName }),
  text: t('ProfilePage.shareUserText', { username: user.fullName }),
});

export { profileShareInfo };
