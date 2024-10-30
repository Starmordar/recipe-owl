import { prisma } from '@/src/shared/api';

async function isRecipeSaved(userId: string | undefined, recipeId: number): Promise<boolean> {
  if (!userId) return false;

  const savedRecipe = await prisma.savedRecipe.findFirst({ where: { userId, recipeId } });
  return !!savedRecipe;
}

export { isRecipeSaved };
