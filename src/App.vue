<template>
  <div id="app">
    <navigation></navigation>
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import actionTypes from './store/action-types';

export default {
  name: 'App',
  components: {
    navigation: Navigation,
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_CURRENT_USER);
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,700');
*, *:before, *:after {
  box-sizing: border-box;
}
html {
  background: hsl(0, 0%, 95%);
}
body {
  margin: 1rem 10%;
  cursor: default;
}
#app {
  overflow: hidden;
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  box-shadow: 0 10px 20px hsl(0, 0%, 90%);
}
main {
  margin: 2rem;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
  text-decoration: none;
}
form {
  margin: 0 auto;
  label {
    display: block;
    text-align: left;
  }
  input,
  button {
    display: block;
    margin-bottom: 1rem;
    width: 100%;
  }
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
