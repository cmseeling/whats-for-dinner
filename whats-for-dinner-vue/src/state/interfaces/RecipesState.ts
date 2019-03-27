import { IDictionary, Dictionary } from '@/utils/Dictionary';
import { Recipe } from '@/models/Recipe';

export interface RecipesState {
    recipes: IDictionary<Recipe>;
}

export const DefaultRecipesState = (): RecipesState => {
    // return {
    //     recipes: new Dictionary<Recipe>()
    // };

    const recipes = new Dictionary<Recipe>();
    // recipes.Upsert('1', {
    //     id: 1,
    //     name: 'Green Eggs and Ham',
    //     ingredients: [
    //         'eggs',
    //         'ham',
    //         'green dye'
    //     ]
    // });
    // recipes.Upsert('2', {
    //     id: 2,
    //     name: 'Peanut Butter Jelly Time',
    //     ingredients: [
    //         'peanut butter',
    //         'jelly',
    //         '45 seconds'
    //     ]
    // });

    return {
        recipes
    };
};
