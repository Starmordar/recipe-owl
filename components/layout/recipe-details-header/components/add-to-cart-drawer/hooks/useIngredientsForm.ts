import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addIngredientsToCart } from '@/app/(main)/cart/actions';
import { toast } from '@/components/ui/use-toast';
import { useServerAction } from '@/hooks/useServerAction';
import { RecipeDetails } from '@/types/api';

import schema, { FormValues } from '../constants/schema';

interface useIngredientsFormOptions {
  recipe: RecipeDetails;
}

function useIngredientsForm({ recipe }: useIngredientsFormOptions) {
  const [addRecipeAction, isPending] = useServerAction(addIngredientsToCart);

  const ingredients = recipe.ingredients.map(ingredient => ingredient.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients },
  });

  async function onSubmit(values: FormValues, quantity: number) {
    await addRecipeAction(recipe.id, values.ingredients, quantity)
      .then(() => toast({ title: 'Recipe successfully added to your cart!' }))
      .catch(() =>
        toast({ title: 'This recipe is already in your cart.', variant: 'destructive' }),
      );
  }

  return { form, isPending, onSubmit };
}

export default useIngredientsForm;
