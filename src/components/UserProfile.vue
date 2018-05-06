<template>
  <dl>
    <dt>Username</dt>
    <dd>{{ user.username }}</dd>
    <dt>Created</dt>
    <dd>{{ user.createdAt | time }} ago</dd>
    <dt>Submissions</dt>
    <dd>{{ user.news.length }} news</dd>
  </dl>
</template>

<script>
export default {
  name: 'UserProfile',
  props: ['id'],
  computed: {
    user() {
      return this.$store.state.users[this.id];
    },
  },
};
</script>

<style lang="scss" scoped>
  dd {
    font-weight: bold;
  }
</style>
