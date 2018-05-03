import gql from 'graphql-tag';
import apollo from '../apollo';

import { mutationTypes } from './mutations';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_USER: 'FETCH_USER',
  FETCH_NEWS: 'FETCH_NEWS',
  SUBMIT: 'SUBMIT',
};

export default {
  [actionTypes.LOGIN]({ commit }, credentials) {
    return apollo.mutate({
      mutation: gql `
        mutation authenticateUser($email: String!, $password: String!) {
          authenticateUser(email: $email, password: $password) {
            id,
            token
          }
        }
      `,
      variables: credentials,
    }).then(({ data: { authenticateUser } }) => {
      const { id, token } = authenticateUser;
      localStorage.setItem('token', token);
      commit(mutationTypes.LOGIN, id);
    });
  },

  [actionTypes.LOGOUT]({ commit }) {
    localStorage.removeItem('token');
    commit(mutationTypes.LOGOUT);
  },

  [actionTypes.FETCH_USER]({ commit }) {
    return apollo.query({
      query: gql `
        query {
          loggedInUser {
            id
          }
        }
      `,
    }).then(({ data: { loggedInUser } }) => {
      if (Object.hasOwnProperty.call(loggedInUser || {}, 'id')) {
        commit(mutationTypes.SET_USER, loggedInUser.id);
      }
    });
  },

  [actionTypes.FETCH_NEWS]({ commit }) {
    return apollo.query({
      query: gql `
        query {
          allNews(orderBy: createdAt_DESC) {
            id,
            title,
            url
          }
        }
      `,
      fetchPolicy: 'network-only',
    }).then(({ data: { allNews } }) => {
      commit(mutationTypes.SET_NEWS, allNews);
    });
  },

  [actionTypes.SUBMIT]({ commit, state }, news) {
    return apollo.mutate({
      mutation: gql `
        mutation createNews($title: String!, $url: String!, $authorId: ID!) {
          createNews(title: $title, url: $url, authorId: $authorId) {
            id,
            title,
            url
          }
        }
      `,
      variables: Object.assign({}, news, {
        authorId: state.userId,
      }),
    }).then(({ data: { createNews } }) => {
      commit(mutationTypes.ADD_NEWS, createNews);
    });
  },
};
