import Image from 'next/image';

import { type RecipePreview, RecipeTagsSection } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import { cn } from '@/src/shared/lib/classnames';

interface RecipeCardProps {
  recipe: RecipePreview;
  className: string;
  imageSizes: string;
}

function RecipeCard({ recipe, imageSizes, className }: RecipeCardProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)} className='group space-y-2'>
      <div className={cn(className, 'relative rounded-lg overflow-hidden')}>
        <RecipeTagsSection recipe={recipe} />

        <Image
          className='transition-transform group-hover:scale-110 duration-300'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes={imageSizes}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className='text-base font-medium leading-5 line-clamp-2'>{recipe.title}</p>
    </Link>
  );
}

export { RecipeCard };
