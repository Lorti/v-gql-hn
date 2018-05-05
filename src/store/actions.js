import gql from 'graphql-tag';
import apollo from '../apollo';

import { mutationTypes } from './mutations';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_USER: 'FETCH_USER',
  FETCH_NEWS: 'FETCH_NEWS',
  SUBMIT: 'SUBMIT',
  UPVOTE: 'UPVOTE',
};

const fragment = `
  fragment newsFields on News {
    id,
    createdAt,
    title,
    url,
    author { username },
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

  async [actionTypes.FETCH_USER]({ commit }) {
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
      commit(mutationTypes.SET_USER, loggedInUser.id);
    }
  },

  async [actionTypes.FETCH_NEWS]({ commit }) {
    const { data: { allNews } } = await apollo.query({
      query: gql `
        query {
          allNews(orderBy: createdAt_DESC) {
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
        authorId: state.userId,
      }),
    });
    commit(mutationTypes.ADD_NEWS, createNews);
  },

  async [actionTypes.UPVOTE]({ commit }, news) {
    const { data: { upvote } } = await apollo.mutate({
      mutation: gql `
        mutation upvoteNews($id: ID!) {
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
