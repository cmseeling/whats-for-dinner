import { createReducer } from 'redux-starter-kit';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import { Recipe } from '../../models/recipe';
import { RecipesState, DefaultRecipesState } from './state';
import recipeActions, { ISetRecipesAction, IUpdateRecipeAction, IRemoveRecipeAction } from './actions';

const recipeReducer = createReducer(DefaultRecipesState(), {
    [recipeActions.SetRecipesAction.type]: (state: RecipesState, action) => {
        const thisAction = (action as ISetRecipesAction);
        state.recipes = thisAction.payload.recipes;
    },
    [recipeActions.UpdateRecipeAction.type]: (state: RecipesState, action) => {
        const thisAction = (action as IUpdateRecipeAction);
        const index = findIndex(state.recipes, (recipe: Recipe) => {
            return recipe.id === thisAction.payload.recipe.id;
        });
        state.recipes[index] = thisAction.payload.recipe;
    },
    [recipeActions.RemoveRecipeAction.type]: (state: RecipesState, action) => {
        const thisAction = (action as IRemoveRecipeAction);
        state.recipes = filter(state.recipes, (recipe: Recipe) => {
            return recipe.id !== thisAction.payload.id;
        });
    }
});

export default recipeReducer;