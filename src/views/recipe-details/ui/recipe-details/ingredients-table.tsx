import { useTranslations } from 'next-intl';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeIngredientsSectionProps {
  ingredients: Array<RecipeDetails['ingredients'][number]>;
}

function RecipeIngredientsSection({ ingredients }: RecipeIngredientsSectionProps) {
  const t = useTranslations('RecipeDetailsPage.General');

  return (
    <Table className='text-base'>
      <TableHeader className='hidden'>
        <TableRow>
          <TableHead>{t('ingredientsNameLabel')}</TableHead>
          <TableHead>{t('ingredientsAmountLabel')}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ingredients.map(ingredient => (
          <TableRow key={ingredient.name} className='[&>td]:p-2 [&>td]:pl-0 [&>td]:pr-4'>
            <TableCell className='break-words'>{ingredient.name}</TableCell>
            <TableCell className='w-[12ch] max-w-[12ch] font-semibold break-words text-right'>
              {ingredient.unit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { RecipeIngredientsSection };
