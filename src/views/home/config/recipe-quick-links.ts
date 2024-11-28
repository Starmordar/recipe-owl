import { searchFilter } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';

const recipeQuickLinks = [
  {
    title: 'Breakfast',
    picture: '/images/breakfast.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=Завтрак`),
  },
  {
    title: 'Pasta',
    picture: '/images/pasta.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Паста`),
  },
  {
    title: 'Chicken',
    picture: '/images/chicken.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Курица`),
  },
  {
    title: 'Salmon',
    picture: '/images/salmon.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=Лосось`),
  },
  {
    title: 'Soup',
    picture: '/images/soup.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Суп`),
  },
];

export { recipeQuickLinks };
