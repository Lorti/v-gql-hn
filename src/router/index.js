import Vue from 'vue';
import Router from 'vue-router';
import List from '@/components/List';
import Login from '@/components/Login';
import Submit from '@/components/Submit';
import User from '@/components/User';
import UserNews from '@/components/UserNews';
import UserProfile from '@/components/UserProfile';
import store from '../store';
import { capitalize } from '../util/filters';

Vue.use(Router);

function createListComponent(type) {
  return {
    title: capitalize(type),
    render(h) {
      return h(List, { props: { type } });
    },
  };
}

const router = new Router({
  mode: 'history',
  fallback: false,
  routes: [
    { path: '/', redirect: '/top' },
    { path: '/top', component: createListComponent('top') },
    { path: '/new', component: createListComponent('new') },
    { path: '/login', component: Login },
    { path: '/submit', component: Submit, meta: { requiresAuth: true } },
    { path: '/users/:id',
      component: User,
      props: true,
      children: [{
        path: 'profile',
        name: 'user-profile',
        component: UserProfile,
        props: true,
      }, {
        path: 'news',
        name: 'user-news',
        component: UserNews,
        props: true,
      }],
    },
    { path: '*', component: { template: '<h1>404</h1>' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
