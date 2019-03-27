import { createAction } from 'redux-starter-kit';

// export const SET_RECIPES = 'SET_RECIPES_ACTION';
// export const UPDATE_RECIPE = 'UPDATE_RECIPE_ACTION';
// export const REMOVE_RECIPE = 'REMOVE_RECIPE_ACTION';

// export const SetRecipesAction = createAction(SET_RECIPES);
// export const UpdateRecipeAction = createAction(UPDATE_RECIPE);
// export const RemoveRecipeAction = createAction(REMOVE_RECIPE);

const SetRecipesAction = createAction('SET_RECIPES_ACTION');
const UpdateRecipeAction = createAction('UPDATE_RECIPE_ACTION');
const RemoveRecipeAction = createAction('REMOVE_RECIPE_ACTION');

const recipeActions = {
    SetRecipesAction,
    UpdateRecipeAction,
    RemoveRecipeAction
}

export default recipeActions;