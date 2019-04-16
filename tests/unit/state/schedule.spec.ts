import schedule from '@/state/modules/schedule';
import { DefaultScheduleState, ScheduleState } from '@/state/interfaces/ScheduleState';

let state: ScheduleState;

describe('schedule.ts', () => {
  beforeEach(() => {
    state = DefaultScheduleState();
    state.mealSlots[1].recipeIds.push(1);
    state.mealSlots[5].recipeIds.push(2);
  });

  it('gets a list of recipe ids', () => {
    expect(schedule.getters.getAllUniqueRecipeIdsFromMealSlots(state)).toContain(1);
    expect(schedule.getters.getAllUniqueRecipeIdsFromMealSlots(state)).toContain(2);
  });

  it('adds a recipe id to a slot', () => {
    const expectedState = {...state};
    expectedState.mealSlots[2].recipeIds.push(3);

    schedule.mutations.addRecipeToMealSlot(state, {slotId: 2, recipeId: 3});

    expect(state).toEqual(expectedState);
  });

  it('removes a recipe id from a slot', () => {
    const expectedState = {...state};
    expectedState.mealSlots[5].recipeIds = [];

    schedule.mutations.removeRecipeFromMealSlot(state, {slotId: 5, recipeId: 2});

    expect(state).toEqual(expectedState);
  });
});
