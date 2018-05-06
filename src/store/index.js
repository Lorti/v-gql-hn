import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    news: {/* [id: string]: news */},
    users: {/* [id: string]: user */},
    // TODO Fetch different lists, instead of fetching all news.
    lists: {
      top: [/* number */],
      new: [],
    },
  },
  actions,
  mutations,
  getters,
});
