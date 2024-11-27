import { getDailyTags } from '../../api/get-daily-tags';
import { RecipesByTagSection } from '../recipes-by-tag';

async function RendomTagsRecipes() {
  const sections = await getDailyTags();
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map(section => (
        <RecipesByTagSection key={section.tag} sectionTitle={section.title} tagName={section.tag} />
      ))}
    </>
  );
}

export { RendomTagsRecipes };
