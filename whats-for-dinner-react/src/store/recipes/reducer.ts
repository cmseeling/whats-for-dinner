import { createReducer } from 'redux-starter-kit';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import { Recipe } from '../../models/recipe';
import { RecipesState, DefaultRecipesState } from './state';
import recipeActions, { ISetRecipesAction, IUpdateRecipeAction, IRemoveRecipeAction, ISetRequestInProgressAction, ISetInitializedAction, IAddRecipeAction } from './actions';

const RecipesSlice = createReducer(DefaultRecipesState(), {
    [recipeActions.SetRecipesAction.type]: (state: RecipesState, action) => {
        const thisAction = (action as ISetRecipesAction);
        state.recipes = thisAction.payload.recipes;
    },
    [recipeActions.AddRecipeAction.type]: (state: RecipesState, action) => {
        const thisAction = (action as IAddRecipeAction);
        state.recipes.push(thisAction.payload.recipe);
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
    },
    [recipeActions.SetRequestInProgress.type]: (state: RecipesState, action) => {
        const thisAction = (action as ISetRequestInProgressAction);
        state.requestInProgress = thisAction.payload.inProgress;
    },
    [recipeActions.SetInitialized.type]: (state: RecipesState, action) => {
        const thisAction = (action as ISetInitializedAction);
        state.initialized = thisAction.payload.initialized;
    }
});

export default RecipesSlice;