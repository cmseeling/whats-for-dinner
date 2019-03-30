import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import RecipesAPI from '../../api/RecipesAPI';
import recipeActions from './actions';
import { Recipe } from "../../models/recipe";

const GetRecipes = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(recipeActions.SetRequestInProgress({inProgress: true}));
      const recipes = await RecipesAPI.readAll();

      dispatch(recipeActions.SetRecipesAction({recipes}));
      dispatch(recipeActions.SetRequestInProgress({inProgress: false}));
      dispatch(recipeActions.SetInitialized({initialized: true}));
  }
};

const SaveRecipe = (recipe: Recipe): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(recipeActions.SetRequestInProgress({inProgress: true}));
    if(recipe.id) {
      const updatedRecipe = await RecipesAPI.update(recipe.id, recipe);
      dispatch(recipeActions.UpdateRecipeAction({recipe: updatedRecipe}));
    }
    else {
      const newRecipe = await RecipesAPI.create(recipe);
      dispatch(recipeActions.AddRecipeAction({recipe: newRecipe}));
    }
    
    dispatch(recipeActions.SetRequestInProgress({inProgress: false}));
  }
};

const DeleteRecipe = (id: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(recipeActions.SetRequestInProgress({inProgress: true}));
      
      await RecipesAPI.deleteItem(id);

      dispatch(recipeActions.RemoveRecipeAction({id}));

      dispatch(recipeActions.SetRequestInProgress({inProgress: false}));
  }
};

const recipeThunks = {
  GetRecipes,
  SaveRecipe,
  DeleteRecipe
}

export default recipeThunks;