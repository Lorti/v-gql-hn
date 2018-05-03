<template>
  <transition-group name="list" tag="ul">
    <li v-for="item in news" :key="item.id">
      <a :href="item.url">{{ item.title }}</a>
      <small>{{ item.url | host }}</small>
    </li>
  </transition-group>
</template>

<script>
import { actionTypes } from '../store/actions';

export default {
  name: 'List',
  computed: {
    news() {
      return this.$store.getters.news;
    },
  },
  created() {
    const fetchNews = () => {
      this.$store.dispatch(actionTypes.FETCH_NEWS);
    };
    fetchNews();
    this.pollingInterval = setInterval(fetchNews, 1000);
  },
  destroyed() {
    clearInterval(this.pollingInterval);
  },
};
</script>

<style scoped>
  ul {
    position: relative;
  }
  li {
    display: block;
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>
