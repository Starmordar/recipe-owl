export interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: Array<string>;
  instructions: Array<string>;
}
