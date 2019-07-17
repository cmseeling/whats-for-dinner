import { Commit, Dispatch } from 'vuex';
import { DefaultIdentityState, IdentityState } from '../interfaces/Identity';
import { User, logout } from 'netlify-identity-widget';
import LambdaAPI from '@/api/LambdaAPI';

const getters = {
  isLoggedIn: (state: IdentityState): boolean => {
    return state.user !== null;
  },

  user: (state: IdentityState): User|null => {
    return state.user;
  },

  userId: (state: IdentityState): string => {
    return state.user ? state.user.id : '';
  },

  userEmail: (state: IdentityState): string => {
    return state.user ? state.user.email : '';
  },

  userName: (state: IdentityState): string => {
    return state.user
      ? state.user.user_metadata
        ? state.user.user_metadata.full_name
        : ''
      : '';
  }
};

const mutations = {
  setUser: (state: IdentityState, user: User|null): void => {
    state.user = user;
  }
};

const actions = {
  init: async ({commit, dispatch}: {commit: Commit, dispatch: Dispatch}): Promise<void> => {
    const json = window.localStorage.getItem('gotrue.user');
    if (json) {
      const user: User = JSON.parse(json);
      if (user.token && user.token.expires_at > Date.now()) {
        commit('setUser', user);
        dispatch('loadUserData');
      } else {
        commit('setUser', null);
        logout();
      }
    }
  },

  updateUser: async ({commit, dispatch}: {commit: Commit, dispatch: Dispatch}, user: User|null): Promise<void> => {
    commit('setUser', user);
    if (user) {
      dispatch('loadUserData');
    } else {
      dispatch('recipes/clearRecipes', null, {root: true});
      dispatch('mealPlans/clearMealPlans', null, {root: true});
    }
  },

  loadUserData: async ({state, dispatch}: {state: IdentityState, dispatch: Dispatch}): Promise<void> => {
    if (state.user) {
      try {
        const data = await LambdaAPI.getData(state.user);
        if (data.recipes) {
          dispatch('recipes/setRecipes', data.recipes, {root: true});
        }
        if (data.mealPlans) {
          dispatch('mealPlans/setMealPlans', data.mealPlans, {root: true});
        }
      } catch (error) {
        let message = 'Could not retrieve your data. ';
        if (error.response) {
          message = message +
            `Server responded with a ${error.response.status} status code and message "${error.response.data.message}"`;
        }
        dispatch('app/setNewErrorMessage', message, {root: true});
      }
    }
  }
};

export default {
  state: DefaultIdentityState(),
  namespaced: true,
  getters,
  mutations,
  actions
};
