import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { RandomRecipe } from './component';

const mapStateToProps = (state: AppState) => {
    return {
      recipes: state.RecipesSlice.recipes,
      initialized: state.RecipesSlice.initialized
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomRecipe);