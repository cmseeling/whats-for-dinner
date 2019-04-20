import { Recipe } from '@/models/recipe';

export function generateRecipe(id: number = 1, name: string = 'test recipe', ingredients: string[] = []): Recipe {
  return {
    id,
    name,
    ingredients
  };
}
