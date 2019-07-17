import { DefaultScheduleState, ScheduleState } from '../interfaces/ScheduleState';
import { MealSlot } from '@/models/MealSlot';
import flatMap from 'lodash/flatMap';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import { Commit } from 'vuex';

const getters = {
  getAllUniqueRecipeIdsFromMealSlots: (state: ScheduleState): number[] => {
    return uniq(flatMap(state.mealSlots, (slot: MealSlot) => {
      return slot.recipeIds;
    }));
  }
};

const mutations = {
  setSchedule: (state: ScheduleState, mealSlots: MealSlot[]): void => {
    state.mealSlots = mealSlots;
  },

  addRecipeToMealSlot: (state: ScheduleState, {slotId, recipeId}: {slotId: number, recipeId: number}): void => {
    // cheating a little since we know the Ids are already sequential
    if (!includes(state.mealSlots[slotId].recipeIds, recipeId)) {
      const updatedSlot = {
        ...state.mealSlots[slotId],
        recipeIds: [...state.mealSlots[slotId].recipeIds, recipeId]
      };

      state.mealSlots.splice(slotId, 1, updatedSlot);
    }
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
  setSchedule: ({commit}: {commit: Commit}, mealSlots: MealSlot[]): void => {
    commit('setSchedule', mealSlots);
  }
};

export default {
  state: DefaultScheduleState(),
  namespaced: true,
  getters,
  mutations,
  actions
};
