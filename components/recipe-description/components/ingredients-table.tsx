import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

export interface Ingredient {
  name: string;
  amount: string;
}

interface IngredientsTableProps {
  ingredients: Array<Ingredient>;
}

export const columns: Array<ColumnDef<Ingredient>> = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'amount', header: 'Amount' },
];

export default function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <div className="">
      <DataTable columns={columns} data={ingredients} />
    </div>
  );
}
