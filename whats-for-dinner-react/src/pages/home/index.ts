import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { Action } from 'redux';
import { HomePage } from './component';
import scheduleActions from '../../store/schedule/actions';

const mapStateToProps = (state: AppState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        addRecipeToMealSlot: (slotId: number, recipeId: number) => {dispatch(scheduleActions.AddRecipeToMealSlotAction({slotId, recipeId}))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);