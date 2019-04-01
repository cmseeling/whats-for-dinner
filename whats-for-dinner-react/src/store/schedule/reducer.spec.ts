import cloneDeep from 'lodash/cloneDeep';
import ScheduleSlice from './reducer';
import scheduleActions from './actions';
import { AnyAction } from 'redux';
import { DefaultScheduleState } from './state';

let state = DefaultScheduleState();

describe('Schedule Reducer', () => {
  beforeEach(() => {
    state = DefaultScheduleState();
  });

  it('should return initial state', () => {
    const unknownAction: AnyAction = {
      type: 'unknown'
    }
    expect(ScheduleSlice(undefined, unknownAction)).toEqual(state);
  });

  it('adds a recipe id to a slot', () => {
    const expectedState = cloneDeep(state);
    expectedState.mealSlots[1].recipeIds = [1];

    const action = scheduleActions.AddRecipeToMealSlotAction({slotId: 1, recipeId: 1});
    const actualState = ScheduleSlice(state, action);

    expect(actualState).toEqual(expectedState);
  });

  it('removes a recipe id from a slot', () => {
    const expectedState = cloneDeep(state);
    state.mealSlots[1].recipeIds.push(1);

    const action = scheduleActions.RemoveRecipeFromMealSlotAction({slotId: 1, recipeId: 1});
    const actualState = ScheduleSlice(state, action);

    expect(actualState).toEqual(expectedState);
  });
});