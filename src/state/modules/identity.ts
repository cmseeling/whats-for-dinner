import { DefaultIdentityState, IdentityState } from '../interfaces/Identity';

const getters = {
  getUserId: (state: IdentityState): string => {
    return state.User ? state.User.id : '';
  },

  getUserEmail: (state: IdentityState): string => {
    return state.User ? state.User.email : '';
  },

  isLoggedIn: (state: IdentityState): boolean => {
    return state.User !== null;
  }
};

const mutations = {

};

export default {
  state: DefaultIdentityState(),
  namespaced: true,
  getters,
  mutations
};
