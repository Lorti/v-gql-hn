import gql from 'graphql-tag';
import apollo from '../apollo';

import { types as mutationTypes } from './mutations';

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_USER: 'FETCH_USER',
  FETCH_NEWS: 'FETCH_NEWS',
  SUBMIT: 'SUBMIT',
};

const loggedInUser = gql `
  query {
    loggedInUser {
      id
    }
  }
`;

const authenticateUser = gql `
  mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id,
      token
    }
  }
`;

const fetchLatestNews = gql `
  query {
    allNews(orderBy: createdAt_DESC) {
      id,
      title,
      url
    }
  }
`;

const createNews = gql `
  mutation createNews($title: String!, $url: String!, $authorId: ID!) {
    createNews(title: $title, url: $url, authorId: $authorId) {
      id,
      title,
      url
    }
  }
`;

export default {
  [types.LOGIN]({ commit }, credentials) {
    return apollo.mutate({
      mutation: authenticateUser,
      variables: credentials,
    }).then(({ data: { authenticateUser: { id, token } } }) => {
      localStorage.setItem('token', token);
      commit(mutationTypes.LOGIN, id);
    });
  },
  [types.LOGOUT]({ commit }) {
    localStorage.removeItem('token');
    commit(mutationTypes.LOGOUT);
  },
  [types.FETCH_USER]({ commit }) {
    return apollo.query({
      query: loggedInUser,
    }).then(({ data: { loggedInUser: { id } } }) => {
      commit(mutationTypes.SET_USER, id);
    });
  },
  [types.FETCH_NEWS]({ commit }) {
    return apollo.query({
      query: fetchLatestNews,
      fetchPolicy: 'network-only',
    }).then(({ data: { allNews: news } }) => {
      commit(mutationTypes.SET_NEWS, news);
    });
  },
  [types.SUBMIT]({ commit, state }, news) {
    return apollo.mutate({
      mutation: createNews,
      variables: Object.assign({}, news, {
        authorId: state.userId,
      }),
    }).then(({ data: { createNews: result } }) => {
      commit(mutationTypes.ADD_NEWS, result);
    });
  },
};
