<template>
  <transition-group name="list" tag="ol">
    <li v-for="(item, index) of news" :key="item.id">
      <div class="layout">
        <div class="index">{{ index + 1 }}</div>
        <div class="points">
          <button @click="upvote(item)" class="upvote">⬆</button>
          {{ item.points }}
        </div>
        <div>
          <div class="main">
            <a :href="item.url" class="title">{{ item.title }}</a>
            <span class="domain">({{ item.url | domain }})</span>
          </div>
          <div class="meta">
            submitted {{ item.createdAt | time }} ago
            by <router-link :to="profileLink(item)">{{ item.author.username }}</router-link>
          </div>
        </div>
      </div>
    </li>
  </transition-group>
</template>

<script>
import actionTypes from '../store/action-types';

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
    profileLink(item) {
      return { name: 'user-profile', params: { id: item.author.id } };
    },
  },
  created() {
    const fetchNews = () => this.$store.dispatch(actionTypes.FETCH_NEWS);
    fetchNews().then(() => {
      // You'll need this for https://github.com/chrisvfritz/prerender-spa-plugin.
      document.dispatchEvent(new Event('prerender-trigger'));
    });
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
    padding-left: 0;
    list-style: none;
  }
  li {
    margin: 1rem 0;
    width: 100%;
    transition: opacity 1s, transform 1s;
  }
  .layout {
    display: flex;
    align-items: center;
  }
  .index {
    flex-shrink: 0;
    width: 1.5rem;
    text-align: right;
    margin-left: -.5rem;
    color: hsl(0, 0%, 25%);
  }
  .points {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2rem;
    font-size: .75rem;
    line-height: 1;
    font-weight: bold;
  }
  .upvote {
    border: none;
    background: none;
    cursor: pointer;
  }
  .main {
    line-height: 1;
    margin-bottom: .5rem;
  }
  .title {
    font-size: 1.125rem;
  }
  .domain {
    font-size: .75rem;
    color: hsl(0, 0%, 50%);
  }
  .meta {
    font-size: .75rem;
    line-height: 1;
    color: hsl(0, 0%, 25%);
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
  .list-leave-active {
    position: absolute;
  }
</style>
