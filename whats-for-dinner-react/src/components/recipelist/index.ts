import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { RecipeList } from './component';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: AppState) => {
    return {
      recipes: state.RecipesSlice.recipes
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);