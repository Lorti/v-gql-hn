<template>
  <div>
    <h1>List</h1>
    <transition-group name="list" tag="ol">
      <li v-for="item in news" :key="item.id">
        <a :href="item.url">{{ item.title }}</a>
        <small>{{ item.url | host }}</small>
      </li>
    </transition-group>
  </div>
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
  ol {
    position: relative;
    padding-left: 0;
  }
  li {
    display: block;
    width: 100%;
    margin: 1rem 0;
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
  .list-leave-active {
    position: absolute;
  }
</style>
