import { IDictionary, Dictionary } from '@/utils/Dictionary';
import { IRecipe } from '@/models/recipe';

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
