import { useTranslations } from 'next-intl';

function OptionalHint() {
  const t = useTranslations('RecipeFormPage.Form.Fields');

  return <span className='font-normal text-muted-foreground'>· {t('optional')}</span>;
}

export { OptionalHint };
