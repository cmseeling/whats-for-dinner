import { Commit, Dispatch } from 'vuex';
import { DefaultIdentityState, IdentityState } from '../interfaces/Identity';
import netlifyIdentity, { User, logout } from 'netlify-identity-widget';
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
    const user = netlifyIdentity.currentUser();
    commit('setUser', user);
    if (user && user.token && user.token.expires_at > Date.now()) {
      dispatch('loadUserData');
    } else {
      logout();
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
    try {
      const data = await LambdaAPI.getData();
      if (data.recipes) {
        dispatch('recipes/setRecipes', data.recipes, {root: true});
      }
      if (data.mealPlans) {
        dispatch('mealPlans/setMealPlans', data.mealPlans, {root: true});
      }
    } catch (error) {
      console.log(error);
      let message = 'Could not retrieve your data. ';
      if (error.response) {
        message = message +
          `Server responded with a ${error.response.status} status code and message "${error.response.data.message}"`;
      }
      dispatch('app/setNewErrorMessage', message, {root: true});
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
