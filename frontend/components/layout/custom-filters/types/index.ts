export interface Category {
  id: number;
  name: string;
  options: Array<{ id: number; title: string }>;
}

export type SelectedFilters = Record<number, Array<string>>;
