import { Recipe } from '../../models/recipe';

export interface RecipesState {
    requestInProgress: boolean;
    initialized: boolean|undefined;
    recipes: Recipe[];
}

export const DefaultRecipesState = (): RecipesState => {
    return {
        requestInProgress: false,
        initialized: undefined,
        recipes: []
        // recipes: [
        //     {
        //         id: 1,
        //         name: 'Green Eggs and Ham',
        //         ingredients: [
        //             'Eggs',
        //             'Ham',
        //             'Green Dye'
        //         ]
        //     },
        //     {
        //         id: 2,
        //         name: 'Peanut Butter Jelly Time',
        //         ingredients: [
        //             'Peanut Butter',
        //             'Jelly',
        //             '45 seconds'
        //         ]
        //     }
        // ]
    };
};
