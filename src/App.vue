<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <router-link to="/">List</router-link>
      <router-link to="/submit">Submit</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
      <a v-else @click="logout">Logout</a>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { types as actions } from './store/actions';

export default {
  name: 'App',
  created() {
    this.$store.dispatch(actions.FETCH_USER);
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(actions.LOGOUT);
      this.$router.push('/');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: underline;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
