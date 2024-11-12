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
  return (
    <Table className='text-base'>
      <TableHeader className='hidden'>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ingredients.map(ingredient => (
          <TableRow key={ingredient.name} className='[&>td]:p-2 [&>td]:pl-0 [&>td]:pr-4'>
            <TableCell className='max-w-[60vw] truncate'>{ingredient.name}</TableCell>
            <TableCell className='max-w-[10vw] truncate font-semibold text-right'>
              {ingredient.unit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { RecipeIngredientsSection };
