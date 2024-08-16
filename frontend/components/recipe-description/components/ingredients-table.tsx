import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Ingredient } from '@/types/recipe';

interface IngredientsTableProps {
  ingredients: Array<Ingredient>;
}

export default function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <section className="flex flex-col">
      <Table>
        <TableHeader className="hidden">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.name} className="[&>td]:p-2 [&>td]:pl-0 [&>td]:pr-4">
              <TableCell>{ingredient.name}</TableCell>
              <TableCell className="font-medium text-right">{ingredient.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
