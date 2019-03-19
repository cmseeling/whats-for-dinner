import { DefaultScheduleState, ScheduleState, IMealSlot } from '../interfaces/ScheduleState';
import without from 'lodash/without';

const getters = {

};

const mutations = {
    removeRecipeFromMealSlot: (state: ScheduleState, {slotId, recipeId}: {slotId: number, recipeId: number}): void => {
        console.log(slotId);
        console.log(recipeId);
        // cheating a little since we know the Ids are already sequential
        const updatedSlot = {
            ...state.mealSlots[slotId],
            recipeIds: without(state.mealSlots[slotId].recipeIds, recipeId)
        };

        state.mealSlots.splice(slotId, 1, updatedSlot);
    }
};

const actions = {
};

export default {
    state: DefaultScheduleState(),
    namespaced: true,
    getters,
    mutations,
    actions
};
