import { createAction, AnyAction } from 'redux-starter-kit';
import { Recipe } from '../../models/recipe';

export interface ISetRecipesAction {
    type: string;
    payload: {
        recipes: Recipe[];
    };
}

export interface IAddRecipeAction {
    type: string;
    payload: {
        recipe: Recipe;
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

export interface ISetRequestInProgressAction {
    type: string;
    payload: {
        inProgress: boolean;
    }
}

export interface ISetInitializedAction {
    type: string;
    payload: {
        initialized: boolean;
    }
}

const SetRecipesAction = createAction('SET_RECIPES_ACTION');
const AddRecipeAction = createAction('ADD_RECIP_ACTION');
const UpdateRecipeAction = createAction('UPDATE_RECIPE_ACTION');
const RemoveRecipeAction = createAction('REMOVE_RECIPE_ACTION');
const SetRequestInProgress = createAction('SET_REQUEST_IN_PROGRESS_ACTION');
const SetInitialized = createAction('SET_INITIALIZED');

const recipeActions = {
    SetRecipesAction,
    AddRecipeAction,
    UpdateRecipeAction,
    RemoveRecipeAction,
    SetRequestInProgress,
    SetInitialized
}

export default recipeActions;