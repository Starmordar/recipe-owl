import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import useServerAction from '@/src/shared/hooks/useServerAction';
import { toast } from '@/src/shared/hooks/useToast';

import { addIngredientsToCart } from '../model/add-ingredients-to-cart';
import { FormValues, schema } from '../model/schema';

import type { RecipeDetails } from '@/src/entities/recipe';

interface UseIngredientsFormOptions {
  recipe: RecipeDetails;
}

function useIngredientsForm({ recipe }: UseIngredientsFormOptions) {
  const [addRecipeAction, isPending] = useServerAction(addIngredientsToCart);

  const ingredients = recipe.ingredients.map(ingredient => ingredient.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients },
  });

  async function onSubmit(values: FormValues, quantity: number) {
    const shareToken = Cookies.get('shareToken');

    await addRecipeAction(recipe.id, values.ingredients, quantity, shareToken)
      .then(() => toast({ title: 'Recipe successfully added to your cart!' }))
      .catch(() =>
        toast({ title: 'This recipe is already in your cart.', variant: 'destructive' }),
      );
  }

  return { form, isPending, onSubmit };
}

export { useIngredientsForm };
