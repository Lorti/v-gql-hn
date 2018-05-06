<template>
  <div>
    <h1>User <small>{{ user.id }}</small></h1>
    <header>
      <router-link :to="{ name: 'user-profile' }">Profile</router-link>
      <router-link :to="{ name: 'user-news' }">News</router-link>
    </header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
  },
};
</script>

<style lang="scss" scoped>
  small {
    display: block;
    font-size: 1.25rem;
  }
  // Transition styles are inherited from `App`.
</style>
