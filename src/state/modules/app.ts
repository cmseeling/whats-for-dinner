import { Commit, Dispatch } from 'vuex';
import { DefaultAppState, AppState } from '../interfaces/App';

const getters = {
  hasError: (state: AppState): boolean => {
    return state.hasError;
  },

  errorMessage: (state: AppState): string => {
    return state.errorMessage;
  }
};

const mutations = {
  setHasError: (state: AppState, hasError: boolean): void => {
    state.hasError = hasError;
  },

  setErrorMessage: (state: AppState, errorMessage: string): void => {
    state.errorMessage = errorMessage;
  }
};

const actions = {
  setNewErrorMessage: ({commit}: {commit: Commit}, errorMessage: string): void => {
    commit('setHasError', true);
    commit('setErrorMessage', errorMessage);
    setTimeout(() => {
      commit('setHasError', false);
      commit('setErrorMessage', '');
    }, 10000);
  },

  dismissErrorMessage: ({commit}: {commit: Commit}): void => {
    commit('setHasError', false);
    commit('setErrorMessage', '');
  }
};

export default {
  state: DefaultAppState(),
  namespaced: true,
  getters,
  mutations,
  actions
};
