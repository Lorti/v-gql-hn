export const mutationTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  SET_NEWS: 'SET_NEWS',
  ADD_NEWS: 'ADD_NEWS',
};

export default {
  [mutationTypes.LOGIN]: (state, id) => {
    state.userId = id;
    state.isLoggedIn = true;
  },
  [mutationTypes.LOGOUT]: (state) => {
    state.userId = null;
    state.isLoggedIn = false;
  },
  [mutationTypes.SET_USER]: (state, id) => {
    state.userId = id;
    state.isLoggedIn = true;
  },
  [mutationTypes.SET_NEWS]: (state, news) => {
    state.news = news;
  },
  [mutationTypes.ADD_NEWS]: (state, news) => {
    state.news = [news, ...state.news];
  },
};
