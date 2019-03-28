import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { Action } from 'redux';
import { MealSlot } from './component';

const mapStateToProps = (state: AppState) => {
    return {
      recipes: state.RecipesSlice.recipes
    }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MealSlot);