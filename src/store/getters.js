export default {
  userId: state => state.userId,
  isLoggedIn: state => state.isLoggedIn,
  news: state => state.news,
  new: state => [...state.news].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  top: state => [...state.news].sort((a, b) => b.points - a.points),
};
