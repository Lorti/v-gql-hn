<template>
  <form @submit.prevent="submit" action="/login" method="post">
    <h2>Login</h2>
    <ul v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <label for="email">Email:</label>
    <input id="email" type="text" name="email" size="20" v-model="email">
    <label for="password">Password:</label>
    <input id="password" type="password" name="password" size="20" v-model="password">
    <input type="submit" value="Login">
  </form>
</template>

<script>
import { types as actions } from '../store/actions';

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      email: null,
      password: null,
      redirect: null,
    };
  },
  created() {
    this.redirect = this.$route.query.redirect || '/';
  },
  methods: {
    submit() {
      this.errors = [];
      if (this.email && this.password) {
        this.$store.dispatch(actions.LOGIN, {
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$router.push(this.redirect);
        }).catch((error) => {
          this.errors.push('Authentication failed.');
          // eslint-disable-next-line
          console.error(error);
        });
      } else {
        this.errors.push('Credentials missing.');
      }
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
