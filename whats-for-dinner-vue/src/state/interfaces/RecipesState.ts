import { IDictionary, Dictionary } from '@/utils/Dictionary';
import { Recipe } from '@/models/Recipe';

export interface IRecipesState {
    recipes: IDictionary<Recipe>;
}

export const DefaultRecipesState = (): IRecipesState => {
    // return {
    //     recipes: new Dictionary<Recipe>()
    // };

    const recipes = new Dictionary<Recipe>();
    recipes.Upsert('1', {
        id: 1,
        name: 'Green Eggs and Ham'
    });
    recipes.Upsert('2', {
        id: 2,
        name: 'Peanut Butter Jelly Time'
    });

    return {
        recipes
    };
};
