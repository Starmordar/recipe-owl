import { Metadata } from 'next';

const appMetadata: Metadata = {
  title: 'Recipe OWL',
  description:
    'Discover, organize, and manage your favorite recipes with ease. Recipe OWL lets you add personal recipes, create grocery lists, and bring your culinary ideas to life—all in one place!',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords:
    'Recipe OWL, recipe manager, personal recipes, grocery list, organize recipes, cooking app, save recipes, recipe book',
  authors: [{ name: 'Roman Borovik', url: 'https://github.com/Starmordar' }],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon_x128.png' },
    { rel: 'icon', url: 'icons/icon_x128.png' },
  ],
  openGraph: {
    images: ['icons/icon_x512.png'],
  },
};

export { appMetadata };
