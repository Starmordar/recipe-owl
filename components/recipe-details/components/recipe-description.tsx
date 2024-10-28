import { isValidURL } from '../utils/isValidUrl';

import RecipeAuthor from './recipe-author';

import type { RecipeDetails } from '@/entities/recipe';

interface RecipeDescriptionProps {
  recipe: RecipeDetails;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div className='w-full mb-2'>
      <h1 className='text-xl font-bold break-words line-clamp-2'>{recipe.title}</h1>
      <RecipeAuthor recipe={recipe} />

      <p className='text-sm leading-5 mt-2 break-words'>{recipe.description}</p>

      <RecipeSource source={recipe.source} />
    </div>
  );
}

interface RecipeSourceProps {
  source: string | null;
}

function RecipeSource({ source }: RecipeSourceProps) {
  if (source === null) return null;

  if (isValidURL(source)) {
    return (
      <a
        className='block text-sm truncate text-sky-600'
        href={source}
        target='_blank'
        rel='noopener noreferrer'
      >
        {source}
      </a>
    );
  }

  return <p className='truncate text-sm'>{source}</p>;
}

export default RecipeDescription;
