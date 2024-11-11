import { RecipeAuthor, type RecipeDetails } from '@/src/entities/recipe';
import { cn } from '@/src/shared/lib/classnames';
import { hashColor } from '@/src/shared/lib/color';
import { isValidURL } from '@/src/shared/lib/is-valid-url';
import { ReadMoreText } from '@/src/shared/ui/read-more-text';

interface RecipeDescriptionProps {
  recipe: RecipeDetails;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div>
      <h1 className='text-2xl font-bold break-words line-clamp-2'>{recipe.title}</h1>
      <ReadMoreText className='text-base leading-5 break-words my-2'>
        {recipe.description}
      </ReadMoreText>

      <RecipeAuthor author={recipe.user} avatarSize={28} />
      <RecipeSource source={recipe.source} />
      {recipe.cookTime && <p className='mt-2'>Cook Time: {recipe.cookTime}</p>}
      {recipe.tags.length > 0 && <RecipeTags tags={recipe.tags} />}
    </div>
  );
}

interface RecipeTagsProps {
  tags: Array<string>;
}

function RecipeTags({ tags }: RecipeTagsProps) {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-2 items-center mt-2'>
      Tags:
      {tags.map(tag => (
        <div
          key={tag}
          style={{ borderColor: hashColor(tag) }}
          className='py-1 px-2.5 border rounded-lg'
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
    <p className={cn('relative flex gap-x-2 text-base mt-2')}>
      <span>Source: </span>

      {isValidURL(source) ? (
        <a
          className='text-base truncate text-primary'
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
