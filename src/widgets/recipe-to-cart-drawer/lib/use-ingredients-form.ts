import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { shareTokenCookieName } from '@/src/entities/cart/config/share-token';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { toast } from '@/src/shared/ui/use-toast';

import { addIngredientsToCart } from '../api/add-ingredients-to-cart';
import { FormValues, useSchema } from '../model/schema';

import { alreadyInCartToast, successToast } from './toast';

import type { RecipeDetails } from '@/src/entities/recipe';

interface UseIngredientsFormOptions {
  recipe: RecipeDetails;
}

function useIngredientsForm({ recipe }: UseIngredientsFormOptions) {
  const t = useTranslations('RecipeDetailsPage.AddToCartDrawer.Toast');
  const [addToCartAction, isPending] = useServerAction(addIngredientsToCart);

  const schema = useSchema();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients: recipe.ingredients.map(ingredient => ingredient.id) },
  });

  async function onSubmit(values: FormValues, quantity: number) {
    const shareToken = Cookies.get(shareTokenCookieName);

    await addToCartAction(recipe.id, values.ingredients, quantity, shareToken)
      .then(() => toast(successToast(t)))
      .catch(() => toast(alreadyInCartToast(t)));
  }

  return { form, isPending, onSubmit };
}

export { useIngredientsForm };
