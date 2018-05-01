export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
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
};
