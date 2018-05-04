<template>
  <header>
    <span class="logo">V</span>
    <nav>
      <router-link to="/">List</router-link> |
      <router-link to="/submit">Submit</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
      <a v-else @click="logout">Logout</a>
    </nav>
  </header>
</template>

<script>
import { actionTypes } from '../store/actions';

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
  .logo {
    float: left;
    margin: 4px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #fff;
  }
  a {
    display: inline-block;
    padding: 0 8px;
    color: inherit;
    line-height: 2;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    &:last-of-type {
      float: right;
    }
  }
</style>
