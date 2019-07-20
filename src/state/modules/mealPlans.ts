import { DefaultMealPlansState, MealPlansState } from '../interfaces/MealPlansState';
import { MealPlan } from '@/models/MealPlan';
import { Commit } from 'vuex';
import forEach from 'lodash/forEach';
import max from 'lodash/max';
import orderBy from 'lodash/orderBy';
import { Dictionary } from '@/utils/Dictionary';
import LambdaAPI from '@/api/LambdaAPI';

const getters = {
  mealPlans: (state: MealPlansState): MealPlan[] => {
    return orderBy(state.mealPlans.Values(), 'id');
  },

  getMealPlanById: (state: MealPlansState) => (id: string): MealPlan => {
    return state.mealPlans.Item(id);
  },

  getMealPlanByIndex: (state: MealPlansState) => (index: number): MealPlan => {
    return state.mealPlans.Values()[index];
  },

  selectedPlanId: (state: MealPlansState): number => {
    return state.selectedPlanId;
  }
};

const mutations = {
  updateMealPlan: (state: MealPlansState, mealPlan: MealPlan): void => {
    if (mealPlan.id) {
      state.mealPlans.Upsert(mealPlan.id.toString(), mealPlan);
    } else {
      throw new Error('Meal Plan Id is null.');
    }
  },

  addMealPlans: (state: MealPlansState, mealPlans: MealPlan[]): void => {
    forEach(mealPlans, (item) => {
      if (item.id) {
        state.mealPlans.Upsert(item.id.toString(), item);
      }
    });
  },

  removeMealPlan: (state: MealPlansState, id: number): void => {
    state.mealPlans.Remove(id.toString());
  },

  resetMealPlans: (state: MealPlansState): void => {
    state.mealPlans = new Dictionary<MealPlan>();
  },

  setSelectedPlanId: (state: MealPlansState, id: number): void => {
    state.selectedPlanId = id;
  }
};

const actions = {
  setMealPlans: ({commit}: {commit: Commit}, mealPlans: MealPlan[]): void => {
    commit('resetMealPlans');
    commit('addMealPlans', mealPlans);
  },

  clearMealPlans: ({commit}: {commit: Commit}): void => {
    commit('resetMealPlans');
  },

  saveMealPlan: async (
      {commit, state, rootGetters}: {commit: Commit, state: MealPlansState, rootGetters: any},
      mealPlan: MealPlan
  ): Promise<number> => {
    let mealPlanData;
    if (mealPlan.id) {
      mealPlanData = {...mealPlan};
    } else {
      const maxId = max(state.mealPlans.Keys());
      let newId;
      if (maxId) {
        newId = +maxId + 1;
      } else {
        newId = 1;
      }
      mealPlanData = {...mealPlan, id: newId};
    }

    commit('updateMealPlan', mealPlanData);
    await LambdaAPI.saveMealPlans(rootGetters['identity/user'], state.mealPlans.Values());
    return (mealPlanData.id as number);
  },

  deleteMealPlan: async (
    {commit, state, rootGetters}: {commit: Commit, state: MealPlansState, rootGetters: any},
    id: number
  ): Promise<void> => {
    commit('removeMealPlan', id);
    await LambdaAPI.saveMealPlans(rootGetters['identity/user'], state.mealPlans.Values());
  }
};

export default {
  state: DefaultMealPlansState(),
  namespaced: true,
  getters,
  mutations,
  actions
};
