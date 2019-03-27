import { createReducer } from 'redux-starter-kit';
import without from 'lodash/without';
import { ScheduleState, DefaultScheduleState } from './state';
import scheduleActions, { IAddRecipeToMealSlotAction, IRemoveRecipeFromMealSlotAction } from './actions';

const scheduleReducer = createReducer(DefaultScheduleState(), {
    [scheduleActions.AddRecipeToMealSlotAction.type]: (state: ScheduleState, action) => {
      const thisAction = (action as IAddRecipeToMealSlotAction);
      state.mealSlots[thisAction.payload.slotId].recipeIds.push(thisAction.payload.recipeId);
    },
    [scheduleActions.RemoveRecipeFromMealSlotAction.type]: (state: ScheduleState, action) => {
      const thisAction = (action as IRemoveRecipeFromMealSlotAction);
      state.mealSlots[thisAction.payload.slotId].recipeIds = without(state.mealSlots[thisAction.payload.slotId].recipeIds, thisAction.payload.recipeId);
    }
});

export default scheduleReducer;