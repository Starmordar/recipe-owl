export interface Ingredient {
  id: number;
  name: string;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Array<Ingredient>;
  steps: Array<string>;
}
