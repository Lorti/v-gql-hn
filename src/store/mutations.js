export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
};

export default {
  [types.LOGIN]: (state, id) => {
    state.userId = id;
    state.isLoggedIn = true;
  },
  [types.LOGOUT]: (state) => {
    state.userId = null;
    state.isLoggedIn = false;
  },
  [types.SET_USER]: (state, id) => {
    state.userId = id;
    state.isLoggedIn = true;
  },
};
