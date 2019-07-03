import { Recipe } from '@/models/Recipe';

export function generateRecipe(id: number = 1, name: string = 'test recipe', ingredients: string[] = []): Recipe {
  return {
    id,
    name,
    ingredients
  };
}
