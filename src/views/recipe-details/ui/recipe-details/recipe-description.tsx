import { RecipeAuthor, type RecipeDetails } from '@/src/entities/recipe';
import { hashColor } from '@/src/shared/lib/color';
import { isValidURL } from '@/src/shared/lib/is-valid-url';
import { ReadMoreText } from '@/src/shared/ui/read-more-text';

interface RecipeDescriptionProps {
  recipe: RecipeDetails;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div className='flex flex-col gap-y-2'>
      <h1 className='text-2xl font-bold break-words line-clamp-2'>{recipe.title}</h1>
      <ReadMoreText className='text-base leading-5 break-words'>{recipe.description}</ReadMoreText>

      <RecipeAuthor author={recipe.user} avatarSize={28} />

      <div aria-hidden='true'></div>
      <RecipeSource source={recipe.source} />

      {recipe.cookTime && (
        <p>
          Time: <span className='font-semibold'>{recipe.cookTime}</span>
        </p>
      )}
      {recipe.tags.length > 0 && <RecipeTags tags={recipe.tags} />}
    </div>
  );
}

interface RecipeTagsProps {
  tags: Array<string>;
}

function RecipeTags({ tags }: RecipeTagsProps) {
  return (
    <div className='flex flex-wrap gap-x-1.5 gap-y-2 items-center'>
      Tags:
      {tags.map(tag => (
        <div
          key={tag}
          style={{ borderColor: hashColor(tag) }}
          className='py-0.5 px-2.5 border rounded-lg'
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

interface RecipeSourceProps {
  source: string | null;
}

function RecipeSource({ source }: RecipeSourceProps) {
  if (!source) return null;

  return (
    <p className='relative flex gap-x-2 text-base'>
      <span>Source: </span>

      {isValidURL(source) ? (
        <a
          className='truncate text-primary'
          href={source}
          target='_blank'
          rel='noopener noreferrer'
        >
          {source}
        </a>
      ) : (
        <span className='truncate'>{source}</span>
      )}
    </p>
  );
}

export { RecipeDescription };
