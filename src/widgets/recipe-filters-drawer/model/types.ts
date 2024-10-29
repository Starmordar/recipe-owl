interface Category {
  id: number;
  name: string;
  options: Array<{ id: number; title: string }>;
}

type SelectedFilters = Record<string, Array<string>>;

export type { SelectedFilters, Category };
