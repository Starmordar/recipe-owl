import Image from 'next/image';
import Link from 'next/link';

import type { Recipe } from '@/types/recipe';

interface RecipePreviewCardProps {
  recipe: Recipe;
}

export default function RecipePreviewCard({ recipe }: RecipePreviewCardProps) {
  console.log('recipe.image.data :>> ', recipe.image);

  const base64Image = Buffer.from(recipe.image.data).toString('base64');
  const mimeType = 'image/jpeg';
  const dataUri = `data:${mimeType};base64,${base64Image}`;

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="relative h-[20vh]">
        <Image
          className="rounded-lg"
          src={dataUri}
          alt={recipe.title ?? ''}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className="text-base font-medium leading-5 mt-1">{recipe.title}</p>
    </Link>
  );
}
