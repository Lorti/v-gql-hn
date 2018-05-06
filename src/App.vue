<template>
  <div id="app">
    <navigation></navigation>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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
*, *:before, *:after {
  box-sizing: border-box;
}
#app {
  margin: 1rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
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
