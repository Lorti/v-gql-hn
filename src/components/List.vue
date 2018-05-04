<template>
  <div>
    <h1>{{ type | capitalize }}</h1>
    <transition-group name="list" tag="ol">
      <li v-for="item in news" :key="item.id">
        <span>
          <a :href="item.url">{{ item.title }}</a>
          <small>({{ item.url | domain }})</small>
          <button @click="upvote(item)">Upvote</button>
        </span>
        <span>
          <small>
            {{ item.points }} points
            by {{ item.author.username }}
            {{ item.createdAt | time }} ago
          </small>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { actionTypes } from '../store/actions';

export default {
  name: 'List',
  props: ['type'],
  computed: {
    news() {
      return this.$store.getters[this.type];
    },
  },
  methods: {
    upvote(item) {
      this.$store.dispatch(actionTypes.UPVOTE, item);
    },
  },
  created() {
    const fetchNews = () => {
      this.$store.dispatch(actionTypes.FETCH_NEWS);
    };
    fetchNews();
    this.pollingInterval = setInterval(fetchNews, 5000);
  },
  destroyed() {
    clearInterval(this.pollingInterval);
  },
};
</script>

<style lang="scss" scoped>
  ol {
    position: relative;
  }
  li {
    width: 100%;
    margin: 1rem 0;
    transition: all 1s;
    span {
      display: block;
    }
    span + span {
      line-height: 1;
    }
  }
  button {
    float: right;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
  .list-leave-active {
    position: absolute;
  }
</style>
