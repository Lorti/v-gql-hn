export const mutationTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  SET_NEWS: 'SET_NEWS',
  ADD_NEWS: 'ADD_NEWS',
  UPVOTE: 'UPVOTE',
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
  [mutationTypes.UPVOTE]: (state, { id, points }) => {
    const clone = [...state.news];
    const index = clone.findIndex(news => news.id === id);
    clone[index] = Object.assign({}, clone[index], { points });
    state.news = clone;
  },
};
