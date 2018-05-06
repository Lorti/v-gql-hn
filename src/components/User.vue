<template>
  <div>
    <header>
      <h1>{{ user.id }}</h1>
      <router-link :to="profileLink">Profile</router-link>
      <router-link :to="newsLink">News</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import store from '../store';
import actionTypes from '../store/action-types';

export default {
  name: 'User',
  props: ['id'],
  title() {
    return this.user.username;
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(actionTypes.FETCH_USERS, [to.params.id]);
    next();
  },
  computed: {
    user() {
      return this.$store.state.users[this.id];
    },
    profileLink() {
      return `/users/${this.user.id}/profile`;
    },
    newsLink() {
      return `/users/${this.user.id}/news`;
    },
  },
};
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 1.25rem;
  }
  header {
    padding: .5rem 0 1rem 40px;
  }
</style>
