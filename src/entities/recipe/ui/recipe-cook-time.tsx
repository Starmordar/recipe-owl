import { useTranslations } from 'next-intl';

import { parseCookTime } from '../lib/parseCookTime';

interface RecipeCookTimeProps {
  /**
   * Displays the formatted cook time for a recipe, or nothing if not provided.
   *
   * Accepts a string with space-separated numeric values and time units, such as "1 hr", "30 min", or "1 hr 15 min".
   */
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
