import Vue from 'vue';
import mutationTypes from './mutation-types';

export default {
  [mutationTypes.LOGIN]: (state, id) => {
    state.currentUser = id;
  },
  [mutationTypes.LOGOUT]: (state) => {
    state.currentUser = null;
  },
  [mutationTypes.SET_LOGGED_IN_USER]: (state, id) => {
    state.currentUser = id;
  },
  [mutationTypes.SET_USERS]: (state, users) => {
    users.forEach((item) => {
      if (item) {
        Vue.set(state.users, item.id, item);
      }
    });
  },
  [mutationTypes.SET_NEWS]: (state, news) => {
    news.forEach((item) => {
      if (item) {
        Vue.set(state.news, item.id, item);
      }
    });
  },
  [mutationTypes.ADD_NEWS]: (state, news) => {
    Vue.set(state.news, news.id, news);
  },
  [mutationTypes.UPVOTE]: (state, { id, points }) => {
    const clone = Object.assign({}, state.news[id], { points });
    Vue.set(state.news, id, clone);
  },
};
