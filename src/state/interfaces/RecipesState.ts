import { IDictionary, Dictionary } from '@/utils/Dictionary';
import { Recipe } from '@/models/Recipe';

export interface RecipesState {
  initialized: boolean;
  recipes: IDictionary<Recipe>;
}

export const DefaultRecipesState = (): RecipesState => {
  const recipes = new Dictionary<Recipe>();

  return {
    initialized: false,
    recipes
  };
};
