'use server';

import { elastic, type ElasticSearchResult } from '@/src/shared/api/elastic';

import { elasticIndexName } from '../config/elastic-index-name';

import type { ElasticRecipe } from '../model/types';

const sourceFields = ['title'] as const;
type SearchResult = ElasticSearchResult<Pick<ElasticRecipe, (typeof sourceFields)[number]>>;

async function searchSuggestions(searchTerm: string): Promise<Array<string>> {
  const searchResult = await elastic.search<SearchResult>({
    index: elasticIndexName,
    body: {
      query: getSearchFilter(searchTerm),
      _source: sourceFields,
      size: 20,
    },
    pretty: true,
  });

  const hits = searchResult?.body?.hits?.hits ?? [];

  const suggestions = hits.map(hit => hit._source.title);
  return suggestions;
}

function getSearchFilter(searchTerm: string) {
  if (!searchTerm) return { match_all: {} };

  return {
    prefix: {
      title: {
        value: searchTerm,
      },
    },
  };
}

export { searchSuggestions };
