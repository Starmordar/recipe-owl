interface SearchResult<Source extends object> {
  hits: { hits: Array<{ _id: string; _source: Source }> };
}

interface AggregationResult {
  aggregations: { recipes: { buckets: Array<{ key: string; doc_count: number }> } };
}

export type { AggregationResult, SearchResult };
