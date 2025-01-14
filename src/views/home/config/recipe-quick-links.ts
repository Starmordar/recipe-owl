import { useTranslations } from 'next-intl';

import { searchFilter } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';

const recipeQuickLinks = (t: ReturnType<typeof useTranslations>) => [
  {
    title: 'Breakfast',
    picture: '/images/breakfast.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Breakfast')}`),
    textColor: '#0c0a09',
  },
  {
    title: 'Pasta',
    picture: '/images/pasta.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Pasta')}`),
    textColor: '#0c0a09',
  },
  {
    title: 'Chicken',
    picture: '/images/chicken.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Chicken')}`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Salmon',
    picture: '/images/salmon.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Salmon')}`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Soup',
    picture: '/images/soup.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Soup')}`),
    textColor: '#0c0a09',
  },
  {
    title: 'Bread',
    picture: '/images/bread.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Bread')}`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Healthy',
    picture: '/images/healthy.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Healthy')}`),
    textColor: '#0c0a09',
  },
  {
    title: 'Keto',
    picture: '/images/keto.webp',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Keto')}`),
    textColor: '#FFFFFF',
  },
  {
    title: 'Salad',
    picture: '/images/salad.jpg',
    url: publicUrls.recipesSearch(`${searchFilter}=${t('Options.Salad')}`),
    textColor: '#0c0a09',
  },
];

export { recipeQuickLinks };
