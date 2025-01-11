import { BaseLayout, NotFoundPage } from '@/src/app';
import { routing } from '@/src/shared/i18n/routing';

function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}

export default GlobalNotFound;
