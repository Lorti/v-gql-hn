import Vue from 'vue';
import Router from 'vue-router';
import List from '@/components/List';
import Login from '@/components/Login';
import Submit from '@/components/Submit';
import store from '../store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: List },
    { path: '/login', component: Login },
    { path: '/submit', component: Submit, meta: { requiresAuth: true } },
  ],
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
