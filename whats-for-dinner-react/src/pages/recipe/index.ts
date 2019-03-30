import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { Action } from 'redux';
import { RecipePage } from './component';
import recipeThunks from '../../store/recipes/thunks';
import { ThunkDispatch } from 'redux-thunk';
import { Recipe } from '../../models/recipe';

const mapStateToProps = (state: AppState) => {
    return {
      recipes: state.RecipesSlice.recipes,
      initialized: state.RecipesSlice.initialized
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        saveRecipe: async (recipe: Recipe) => await dispatch(recipeThunks.SaveRecipe(recipe)),
        deleteRecipe: async (id: number) => await dispatch(recipeThunks.DeleteRecipe(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);