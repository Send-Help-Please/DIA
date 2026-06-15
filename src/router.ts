import { createRouter, createWebHashHistory } from 'vue-router';

import Dashboard from './modules/dashboard/Dashboard.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      component: Dashboard,
    }
  ],
});