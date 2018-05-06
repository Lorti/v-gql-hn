const orderByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
const orderByPoints = (a, b) => b.points - a.points;

export default {
  isLoggedIn: state => !!state.currentUser,
  // TODO Fetch different lists, instead of fetching all news.
  new: state => [...Object.values(state.news)].sort(orderByDate).slice(0, 5),
  top: state => [...Object.values(state.news)].sort(orderByPoints).slice(0, 5),
};
