import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import { shareTokenCookieName } from '@/src/entities/cart/config/share-token';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { toast } from '@/src/shared/ui/use-toast';

import { addIngredientsToCart } from '../api/add-ingredients-to-cart';
import { FormValues, schema } from '../model/schema';

import type { RecipeDetails } from '@/src/entities/recipe';

interface UseIngredientsFormOptions {
  recipe: RecipeDetails;
}

function useIngredientsForm({ recipe }: UseIngredientsFormOptions) {
  const [addToCartAction, isPending] = useServerAction(addIngredientsToCart);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients: recipe.ingredients.map(ingredient => ingredient.id) },
  });

  async function onSubmit(values: FormValues, quantity: number) {
    const shareToken = Cookies.get(shareTokenCookieName);

    await addToCartAction(recipe.id, values.ingredients, quantity, shareToken)
      .then(() => toast({ title: 'Recipe successfully added to your cart!' }))
      .catch(() =>
        toast({ title: 'This recipe is already in your cart.', variant: 'destructive' }),
      );
  }

  return { form, isPending, onSubmit };
}

export { useIngredientsForm };
