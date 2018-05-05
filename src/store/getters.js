const orderByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
const orderByPoints = (a, b) => b.points - a.points;

export default {
  userId: state => state.userId,
  isLoggedIn: state => state.isLoggedIn,
  news: state => state.news,
  new: state => [...state.news].sort(orderByDate).slice(0, 5),
  top: state => [...state.news].sort(orderByPoints).slice(0, 5),
};
