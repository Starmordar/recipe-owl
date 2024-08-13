export interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: Array<string>;
  steps: Array<string>;
}
