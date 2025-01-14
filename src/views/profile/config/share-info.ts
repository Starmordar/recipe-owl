import { useTranslations } from 'next-intl';

import type { User } from 'lucia';

const profileShareInfo = (user: User, t: ReturnType<typeof useTranslations>) => ({
  title: t('title', { username: user.fullName }),
  text: t('text', { username: user.fullName }),
});

export { profileShareInfo };
