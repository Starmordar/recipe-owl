import Image from 'next/image';
import Link from 'next/link';

import type { Recipe } from '@/types/recipe';

interface RecipePreviewCardProps {
  recipe: Recipe;
}

export default function RecipePreviewCard({ recipe }: RecipePreviewCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="relative h-[20vh]">
        <Image
          className="rounded-lg"
          src={recipe.image}
          alt={`${recipe.name} Image`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className="text-base font-medium leading-5 mt-1">{recipe.name}</p>
    </Link>
  );
}
