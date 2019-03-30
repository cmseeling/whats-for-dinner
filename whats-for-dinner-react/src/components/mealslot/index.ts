import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { Action } from 'redux';
import { MealSlot } from './component';
import scheduleActions from '../../store/schedule/actions';

const mapStateToProps = (state: AppState) => {
    return {
      recipes: state.RecipesSlice.recipes
    }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
      removeRecipeFromMealSlot: (slotId: number, recipeId: number) => {dispatch(scheduleActions.RemoveRecipeFromMealSlotAction({slotId, recipeId}))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MealSlot);