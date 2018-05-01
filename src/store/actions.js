import { types as mutationTypes } from './mutations';

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export default {
  [types.LOGIN]({ commit }, { id, token }) {
    localStorage.setItem('token', token);
    commit(mutationTypes.LOGIN, id);
  },
  [types.LOGOUT]({ commit }) {
    localStorage.removeItem('token');
    commit(mutationTypes.LOGOUT);
  },
};
