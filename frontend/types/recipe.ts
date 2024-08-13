export interface Recipe {
  id: number;
  name: string;
  title?: string;
  image: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  steps?: Array<string>;
}
