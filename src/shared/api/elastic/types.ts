interface SearchResult<Source extends object> {
  hits: { hits: Array<{ _id: string; _source: Source }> };
}

export type { SearchResult };
