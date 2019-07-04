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
  }
};

const mutations = {
  setUser: (state: IdentityState, user: User): void => {
    state.user = user;
  }
};

export default {
  state: DefaultIdentityState(),
  namespaced: true,
  getters,
  mutations
};
