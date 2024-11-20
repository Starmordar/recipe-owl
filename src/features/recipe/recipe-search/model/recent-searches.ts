const storageKey = 'recipe-recent-search';
const storageLimit = 10;

function storeRecipeRecentSearches(search: string) {
  if (!search) return;

  const recentSearches = retrieveRecipeRecentSearches().filter(recent => recent !== search);
  if (recentSearches.length > storageLimit - 1) {
    const [_, ...rest] = recentSearches;
    localStorage.setItem(storageKey, JSON.stringify([search, ...rest]));
    return;
  }

  localStorage.setItem(storageKey, JSON.stringify([search, ...recentSearches]));
}

function retrieveRecipeRecentSearches(): Array<string> {
  if (!window?.localStorage) return [];

  const storedSearches = localStorage.getItem(storageKey);
  if (!storedSearches) return [];

  try {
    const recentSearchesArr = JSON.parse(storedSearches);
    return Array.isArray(recentSearchesArr) ? recentSearchesArr : [];
  } catch (error) {
    return [];
  }
}

function removeRecipeRecentSearches(search: string) {
  const recentSearches = retrieveRecipeRecentSearches();
  const updatedRecent = recentSearches.filter(recent => recent !== search);

  localStorage.setItem(storageKey, JSON.stringify(updatedRecent));
}

export { storeRecipeRecentSearches, retrieveRecipeRecentSearches, removeRecipeRecentSearches };
