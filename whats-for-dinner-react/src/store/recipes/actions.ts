import { createAction } from 'redux-starter-kit';
import { Recipe } from '../../models/recipe';

export interface ISetRecipesAction {
    type: string;
    payload: {
        recipes: Recipe[];
    };
}

export interface IUpdateRecipeAction {
    type: string;
    payload: {
        recipe: Recipe;
    };
}

export interface IRemoveRecipeAction {
    type: string;
    payload: {
        id: number;
    };
}

const SetRecipesAction = createAction('SET_RECIPES_ACTION');
const UpdateRecipeAction = createAction('UPDATE_RECIPE_ACTION');
const RemoveRecipeAction = createAction('REMOVE_RECIPE_ACTION');

const recipeActions = {
    SetRecipesAction,
    UpdateRecipeAction,
    RemoveRecipeAction
}

export default recipeActions;