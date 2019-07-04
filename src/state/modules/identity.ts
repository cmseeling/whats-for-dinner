import { Commit } from 'vuex';
import { DefaultIdentityState, IdentityState } from '../interfaces/Identity';
import { User } from 'netlify-identity-widget';

const getters = {
  isLoggedIn: (state: IdentityState): boolean => {
    return state.user !== null;
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
  init: async ({commit}: {commit: Commit}): Promise<void> => {
    let json = window.localStorage.getItem('gotrue.user');
    if(json) {
      let user = JSON.parse(json);
      commit('setUser', user);
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
