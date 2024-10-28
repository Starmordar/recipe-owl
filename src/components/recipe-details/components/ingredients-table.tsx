import type { RecipeDetails } from '@/src/entities/recipe';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/shared/ui/table';

interface IngredientsTableProps {
  ingredients: Array<RecipeDetails['ingredients'][number]>;
}

function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <section className='flex flex-col'>
      <Table>
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
              <TableCell className='max-w-[25vw] truncate font-medium text-right'>
                {ingredient.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default IngredientsTable;
