import gql from 'graphql-tag';
import apollo from '../apollo';

import actionTypes from './action-types';
import mutationTypes from './mutation-types';

const fragment = `
  fragment newsFields on News {
    id,
    createdAt,
    title,
    url,
    author { 
      id,
      username
    },
    points
  }
`;

export default {
  async [actionTypes.LOGIN]({ commit }, credentials) {
    const { data: { authenticateUser } } = await apollo.mutate({
      mutation: gql `
        mutation authenticateUser($email: String!, $password: String!) {
          authenticateUser(email: $email, password: $password) {
            id,
            token
          }
        }
      `,
      variables: credentials,
    });
    const { id, token } = authenticateUser;
    localStorage.setItem('token', token);
    commit(mutationTypes.LOGIN, id);
  },

  [actionTypes.LOGOUT]({ commit }) {
    localStorage.removeItem('token');
    commit(mutationTypes.LOGOUT);
  },

  async [actionTypes.FETCH_CURRENT_USER]({ commit, dispatch }) {
    const { data: { loggedInUser } } = await apollo.query({
      query: gql `
        query {
          loggedInUser {
            id
          }
        }
      `,
    });
    if (Object.hasOwnProperty.call(loggedInUser || {}, 'id')) {
      commit(mutationTypes.SET_LOGGED_IN_USER, loggedInUser.id);
      dispatch(actionTypes.FETCH_USERS, [loggedInUser.id]);
    }
  },

  async [actionTypes.FETCH_USERS]({ commit }, ids) {
    const { data: { allUsers } } = await apollo.query({
      query: gql `
        query allUsers($ids: [ID!]!) {
          allUsers(filter: { id_in: $ids }) {
            id,
            username,
            createdAt,
            news {
              id
            }
          }
        }
      `,
      variables: {
        ids,
      },
    });
    commit(mutationTypes.SET_USERS, allUsers);
  },

  async [actionTypes.FETCH_NEWS]({ commit }) {
    const { data: { allNews } } = await apollo.query({
      query: gql `
        query {
          allNews {
            ...newsFields
          }
        }
        ${fragment}
      `,
      fetchPolicy: 'network-only',
    });
    commit(mutationTypes.SET_NEWS, allNews);
  },

  async [actionTypes.SUBMIT]({ commit, state }, news) {
    const { data: { createNews } } = await apollo.mutate({
      mutation: gql `
        mutation createNews($title: String!, $url: String!, $authorId: ID!) {
          createNews(title: $title, url: $url, authorId: $authorId) {
            ...newsFields
          }
        }
        ${fragment}
      `,
      variables: Object.assign({}, news, {
        authorId: state.currentUser,
      }),
    });
    commit(mutationTypes.ADD_NEWS, createNews);
  },

  async [actionTypes.UPVOTE]({ commit }, news) {
    const { data: { upvote } } = await apollo.mutate({
      mutation: gql `
        mutation upvote($id: ID!) {
          upvote(id: $id) {
            id,
            points
          }
        }
      `,
      variables: {
        id: news.id,
      },
    });
    commit(mutationTypes.UPVOTE, upvote);
  },
};
