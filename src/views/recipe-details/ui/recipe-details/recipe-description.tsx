import { RecipeAuthor, type RecipeDetails } from '@/src/entities/recipe';
import { isValidURL } from '@/src/shared/lib/is-valid-url';

interface RecipeDescriptionProps {
  recipe: RecipeDetails;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div>
      <h1 className='text-2xl font-bold break-words line-clamp-2'>{recipe.title}</h1>
      <p className='text-base leading-5 break-words my-2'>{recipe.description}</p>

      <RecipeAuthor author={recipe.user} />
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

export { RecipeDescription };
