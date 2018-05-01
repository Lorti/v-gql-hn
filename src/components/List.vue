<template>
  <ul>
    <li v-for="item in news" :key="item.id">
      <a :href="item.url">{{ item.title }}</a>
      <small>{{ item.url | host }}</small>
    </li>
  </ul>
</template>

<script>
import { types as actions } from '../store/actions';

export default {
  name: 'List',
  computed: {
    news() {
      return this.$store.getters.news;
    },
  },
  created() {
    this.$store.dispatch(actions.FETCH_NEWS);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
