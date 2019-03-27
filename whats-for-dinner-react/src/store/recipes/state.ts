import { Recipe } from '../../models/recipe';

export interface RecipesState {
    recipes: Recipe[];
}

export const DefaultRecipesState = (): RecipesState => {
    return {
        recipes: []
    };
};
