import { searchFilter } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';

const recipeQuickLinks = [
  {
    title: 'Breakfast',
    picture: '/images/breakfast.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=Завтрак`),
    textColor: '#0c0a09',
  },
  {
    title: 'Pasta',
    picture: '/images/pasta.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Паста`),
    textColor: '#0c0a09',
  },
  {
    title: 'Chicken',
    picture: '/images/chicken.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Курица`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Salmon',
    picture: '/images/salmon.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=Лосось`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Soup',
    picture: '/images/soup.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Суп`),
    textColor: '#0c0a09',
  },
  {
    title: 'Bread',
    picture: '/images/bread.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Хлеб`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Healthy',
    picture: '/images/healthy.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=Полезное`),
    textColor: '#0c0a09',
  },
  {
    title: 'Keto',
    picture: '/images/keto.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=Кето`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Salad',
    picture: '/images/salad.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=Салат`),
    textColor: '#0c0a09',
  },
];

export { recipeQuickLinks };
