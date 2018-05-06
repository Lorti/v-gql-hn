<template>
  <div>
    <h1>Submit</h1>
    <form @submit.prevent="submit" action="/submit" method="post">
      <ul v-if="errors.length">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <label for="title">Title</label>
      <input id="title" type="text" name="title" size="20" v-model="title">
      <label for="url">URL</label>
      <input id="url" type="text" name="url" size="20" v-model="url">
      <button type="submit" :disabled="loading">Submit</button>
    </form>
  </div>
</template>

<script>
import actionTypes from '../store/action-types';

export default {
  name: 'Submit',
  data() {
    return {
      errors: [],
      title: null,
      url: null,
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.errors = [];

      if (!this.title || !this.url) {
        return;
      }

      this.loading = true;

      try {
        await this.$store.dispatch(actionTypes.SUBMIT, {
          title: this.title,
          url: this.url,
        });
        this.$router.push('/');
        this.loading = false;
      } catch (error) {
        this.errors.push('Submit failed.');
        this.loading = false;
      }
    },
  },
};
</script>
