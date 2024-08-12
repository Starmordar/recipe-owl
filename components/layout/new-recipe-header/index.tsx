import { EllipsisVertical } from 'lucide-react';
import ReturnBackBtn from '../components/return-back-btn';
import { Button } from '@/components/ui/button';

export default async function NewRecipeHeader() {
  return (
    <div className="container flex items-center justify-between pt-2 pb-1 h-12">
      <ReturnBackBtn />

      <div className="flex items-center  gap-3">
        <Button size="xss" variant="outline">
          Save
        </Button>
        <Button size="xss" variant="default">
          Publish
        </Button>
        <EllipsisVertical className="h-4 w-4 opacity-50" />
      </div>
    </div>
  );
}
