import { DefaultScheduleState, ScheduleState, IMealSlot } from '../interfaces/ScheduleState';
import without from 'lodash/without';
import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';

const getters = {
    getAllUniqueRecipeIdsFromMealSlots: (state: ScheduleState): number[] => {
        return uniq(flatMap(state.mealSlots, (slot: IMealSlot) => {
            return slot.recipeIds;
        }));
    }
};

const mutations = {
    addRecipeToMealSlot: (state: ScheduleState, {slotId, recipeId}: {slotId: number, recipeId: number}): void => {
        // cheating a little since we know the Ids are already sequential
        const updatedSlot = {
            ...state.mealSlots[slotId],
            recipeIds: [...state.mealSlots[slotId].recipeIds, recipeId]
        };

        state.mealSlots.splice(slotId, 1, updatedSlot);
    },

    removeRecipeFromMealSlot: (state: ScheduleState, {slotId, recipeId}: {slotId: number, recipeId: number}): void => {
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
