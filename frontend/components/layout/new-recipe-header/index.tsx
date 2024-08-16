import { EllipsisVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';

import ReturnBackBtn from '../components/return-back-btn';

export default async function NewRecipeHeader() {
  return (
    <div className="container flex items-center justify-between pt-2 pb-1 h-12">
      <ReturnBackBtn />

      <div className="flex items-center  gap-3">
        <Button form="create-recipe-form" size="xss" variant="default">
          Save
        </Button>
        <EllipsisVertical className="h-4 w-4 opacity-50" />
      </div>
    </div>
  );
}
