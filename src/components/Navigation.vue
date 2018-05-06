<template>
  <header>
    <img src="../assets/logo.png">
    <nav>
      <router-link to="/top">Top</router-link> |
      <router-link to="/new">New</router-link> |
      <router-link to="/submit">Submit</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
      <a v-else @click="logout">Logout</a>
    </nav>
  </header>
</template>

<script>
import actionTypes from '../store/action-types';

export default {
  name: 'Navigation',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.LOGOUT);
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
  header {
    overflow: hidden;
    color: #fff;
    background: #42b983;
    text-align: left;
  }
  img {
    float: left;
    margin: 10px;
    width: 24px;
    height: 24px;
  }
  a {
    display: inline-block;
    padding: 0 8px;
    border-bottom: 2px solid transparent;
    color: inherit;
    line-height: 44px;
    text-decoration: none;
    cursor: pointer;

    &:last-of-type {
      float: right;
      margin-right: 10px;
    }
  }
  .router-link-active {
    font-weight: bold;
    border-color: #fff;
  }
</style>
