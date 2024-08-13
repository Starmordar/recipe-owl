import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface Ingredient {
  name: string;
  amount: string;
}

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
              <TableCell className="font-medium text-right">{ingredient.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
