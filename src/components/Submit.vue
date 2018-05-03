<template>
  <form @submit.prevent="submit" action="/submit" method="post">
    <h2>Submit</h2>
    <ul v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <label for="title">Title</label>
    <input id="title" type="text" name="title" size="20" v-model="title">
    <label for="url">URL</label>
    <input id="url" type="text" name="url" size="20" v-model="url">
    <button type="submit" :disabled="loading">Submit</button>
  </form>
</template>

<script>
import { actionTypes } from '../store/actions';

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      title: null,
      url: null,
      loading: false,
    };
  },
  methods: {
    submit() {
      this.errors = [];

      if (!this.title || !this.url) {
        return;
      }

      this.loading = true;

      this.$store.dispatch(actionTypes.SUBMIT, {
        title: this.title,
        url: this.url,
      }).then(() => {
        this.$router.push('/');
        this.loading = false;
      }).catch(() => {
        this.errors.push('Submit failed.');
        this.loading = false;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
