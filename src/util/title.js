function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
  return null;
}

const titleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = `Hacker News w/ Vue.js and GraphQL | ${title}`;
    }
  },
};

export default titleMixin;
