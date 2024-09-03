import { X } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getCart } from '@/lib/data/cart';

async function GroceryCart() {
  const cart = await getCart();
  if (!cart) return null;

  return (
    <div className='flex flex-col gap-4'>
      {cart.map(({ recipe, ingredients }) => {
        return (
          <Card key={recipe.id}>
            <CardHeader className='flex flex-row p-4 space-y-0 gap-4'>
              <div className='relative min-w-[20vw] h-[20vw]'>
                <Image
                  className='rounded-lg'
                  src={recipe.imageUrl}
                  alt={`${recipe.title} recipe image`}
                  fill
                  sizes='20vw'
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='mt-0'>
                <CardTitle>{recipe.title}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className='grid p-4 gap-2'>
              {ingredients.map(ingredient => {
                return (
                  <div key={ingredient.name}>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>{ingredient.name}</p>
                      <p className='text-sm text-muted-foreground'>{ingredient.unit}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default GroceryCart;
