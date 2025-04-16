import { useTranslations } from 'next-intl';

interface RecipeTagsSummaryProps {
  /** List of recipe tags, only the first tag in the list is displayed. */
  tags: Array<string>;
}

function RecipeTagsSummary({ tags }: RecipeTagsSummaryProps) {
  const t = useTranslations('RecipeTags');
  if (tags.length === 0) return null;

  return (
    <div className='bg-lime-200 dark:bg-lime-600 rounded-xl px-2 py-0.5 inline-flex'>
      {t(`Items.${tags[0]}`)}
    </div>
  );
}

export { RecipeTagsSummary };
