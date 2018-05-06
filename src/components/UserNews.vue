<template>
  <ol>
    <li v-for="item in news" :key="item.id">
      <a :href="item.url">{{ item.title }}</a>
    </li>
  </ol>
</template>

<script>
import store from '../store';
import actionTypes from '../store/action-types';

export default {
  name: 'UserNews',
  props: ['id'],
  async beforeRouteEnter(to, from, next) {
    // TODO Fetch different lists, instead of fetching all news.
    await store.dispatch(actionTypes.FETCH_NEWS);
    next();
  },
  computed: {
    user() {
      return this.$store.state.users[this.id];
    },
    news() {
      return this.user.news.map(({ id }) => this.$store.state.news[id]);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
