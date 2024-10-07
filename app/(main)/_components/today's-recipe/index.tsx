import { getTodaysRecipe } from '../../actions';

import ParallaxImage from './components/parallax-image';

async function TodaysRecipe() {
  const recipe = await getTodaysRecipe();
  if (!recipe) return null;

  return (
    <div className='relative'>
      <ParallaxImage recipe={recipe} />
    </div>
  );
}

export default TodaysRecipe;
