import { Recipe } from '../../models/recipe';

export interface IRecipesState {
    recipes: Recipe[];
}

export const DefaultRecipesState = (): IRecipesState => {
    return {
        recipes: []
    };
};
