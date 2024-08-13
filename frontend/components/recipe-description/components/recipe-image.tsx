import Image from 'next/image';
import type { Recipe } from '@/types/recipe';

interface RecipeImageProps {
  recipe: Recipe;
}

export default function RecipeImage({ recipe }: RecipeImageProps) {
  const base64Image = Buffer.from(recipe.image.data).toString('base64');
  const mimeType = 'image/jpeg';
  const dataUri = `data:${mimeType};base64,${base64Image}`;

  return (
    <div className="relative h-[40vh]">
      <Image
        className="rounded-lg"
        src={dataUri}
        alt={recipe.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
