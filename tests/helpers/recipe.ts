import { IRecipe } from '@/models/recipe';

export function generateRecipe(id: number = 1, name: string = 'test recipe', ingredients: string[] = []): IRecipe {
  return {
    id,
    name,
    ingredients
  };
}
