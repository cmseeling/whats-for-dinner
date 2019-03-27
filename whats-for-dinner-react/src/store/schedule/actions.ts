import { createAction } from 'redux-starter-kit';

export interface IAddRecipeToMealSlotAction {
  type: string;
  payload: {
    slotId: number;
    recipeId: number;
  };
}

export interface IRemoveRecipeFromMealSlotAction {
  type: string;
  payload: {
    slotId: number;
    recipeId: number;
  };
}

const AddRecipeToMealSlotAction = createAction('ADD_TO_MEAL_SLOT_ACTION');
const RemoveRecipeFromMealSlotAction = createAction('REMOVE_FROM_MEAL_SLOT_ACTION');

const scheduleActions = {
  AddRecipeToMealSlotAction,
  RemoveRecipeFromMealSlotAction
}

export default scheduleActions;