<template>
  <form @submit.prevent="submit" action="/submit" method="post">
    <h2>Submit</h2>
    <ul v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <label for="title">Title:</label>
    <input id="title" type="text" name="title" size="20" v-model="title">
    <label for="url">URL:</label>
    <input id="url" type="text" name="url" size="20" v-model="url">
    <input type="submit" value="Submit">
  </form>
</template>

<script>
// import { types as actions } from '../store/actions';

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      title: null,
      url: null,
    };
  },
  methods: {
    submit() {

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
