<template>
  <form @submit.prevent="submit" action="/login" method="post">
    <h2>Login</h2>
    <ul v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <label for="email">Email</label>
    <input id="email" type="text" name="email" size="20" v-model="email">
    <label for="password">Password</label>
    <input id="password" type="password" name="password" size="20" v-model="password">
    <button type="submit" :disabled="loading">Login</button>
  </form>
</template>

<script>
import { actionTypes } from '../store/actions';

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      email: null,
      password: null,
      redirect: null,
      loading: false,
    };
  },
  created() {
    this.redirect = this.$route.query.redirect || '/';
  },
  methods: {
    submit() {
      this.errors = [];

      if (!this.email || !this.password) {
        this.errors.push('Credentials missing.');
        return;
      }

      this.loading = true;

      this.$store.dispatch(actionTypes.LOGIN, {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push(this.redirect);
        this.loading = false;
      }).catch(() => {
        this.errors.push('Login failed.');
        this.loading = false;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
