import { createReducer } from 'redux-starter-kit';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import { IRecipesState, DefaultRecipesState } from './state';
import recipeActions from './actions';
import { Recipe } from '../../models/recipe';

const recipeReducer = createReducer(DefaultRecipesState(), {
    [recipeActions.SetRecipesAction.type]: (state, action) => {
        state.recipes = action.payload;
    },
    [recipeActions.UpdateRecipeAction.type]: (state, action) => {
        const index = findIndex(state.recipes, (recipe: Recipe) => {
            return recipe.id === action.payload.id;
        });
        state.recipes[index] = action.payload;
    },
    [recipeActions.RemoveRecipeAction.type]: (state, action) => {
        state.recipes = filter(state.recipes, (recipe: Recipe) => {
            return recipe.id !== action.payload;
        });
    }
});

export default recipeReducer;