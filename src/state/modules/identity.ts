import { Commit, Dispatch } from 'vuex';
import { DefaultIdentityState, IdentityState } from '../interfaces/Identity';
import { User } from 'netlify-identity-widget';
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
      const user = JSON.parse(json);
      commit('setUser', user);
      dispatch('loadUserData');
    }
  },

  updateUser: async ({commit, dispatch}: {commit: Commit, dispatch: Dispatch}, user: User|null): Promise<void> => {
    commit('setUser', user);
    if (user) {
      dispatch('loadUserData');
    } else {
      dispatch('recipes/clearRecipes', null, {root: true});
    }
  },

  loadUserData: async ({state, dispatch}: {state: IdentityState, dispatch: Dispatch}): Promise<void> => {
    if (state.user) {
      try {
        const data = await LambdaAPI.getData(state.user);
        dispatch('recipes/setRecipes', data.recipes, {root: true});
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
