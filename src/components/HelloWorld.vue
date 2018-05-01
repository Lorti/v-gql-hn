<template>
  <div>
    <router-link to="/submit">Submit</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <button v-else @click="logout">Logout</button>
  </div>
</template>

<script>
import { types as actions } from '../store/actions';

export default {
  name: 'HelloWorld',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
</style>
