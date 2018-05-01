export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  SET_NEWS: 'SET_NEWS',
  ADD_NEWS: 'ADD_NEWS',
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
  [types.SET_NEWS]: (state, news) => {
    state.news = news;
  },
  [types.ADD_NEWS]: (state, news) => {
    state.news.unshift(news);
  },
};
