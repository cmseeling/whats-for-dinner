import { IDictionary, Dictionary } from '@/utils/Dictionary';
import { IRecipe } from '@/models/Recipe';

export interface RecipesState {
  initialized: boolean;
  recipes: IDictionary<IRecipe>;
}

export const DefaultRecipesState = (): RecipesState => {
  const recipes = new Dictionary<IRecipe>();

  return {
    initialized: false,
    recipes
  };
};
