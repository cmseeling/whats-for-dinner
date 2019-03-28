import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { Action } from 'redux';
import { MealSchedule } from './component';

const mapStateToProps = (state: AppState) => {
    return {
      mealSlots: state.ScheduleSlice.mealSlots
    }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MealSchedule);