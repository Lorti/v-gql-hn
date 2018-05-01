import gql from 'graphql-tag';
import apollo from '../apollo';

import { types as mutationTypes } from './mutations';

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_USER: 'FETCH_USER',
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
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.resolve();
    }
    return apollo.query({
      query: loggedInUser,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }).then(({ data: { loggedInUser: { id } } }) => {
      commit(mutationTypes.SET_USER, id);
    }).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
  },
};
