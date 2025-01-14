import { useTranslations } from 'next-intl';

import { parseCookTime } from '../lib/parseCookTime';

interface RecipeCookTimeProps {
  cookTime: string | null;
}

function RecipeCookTime({ cookTime }: RecipeCookTimeProps) {
  const t = useTranslations('RecipeDetailsPage.General');
  if (!cookTime) return null;

  return (
    <p>
      {t('timeLabel')}{' '}
      <span className='font-semibold'>
        {t('cookTime', {
          ...parseCookTime(cookTime ?? ''),
        })}
      </span>
    </p>
  );
}

export { RecipeCookTime };
