import { createRouter, createWebHashHistory } from 'vue-router';

import Dashboard from './modules/dashboard/Dashboard.vue';
import Home from './modules/home/Home.vue';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/dashboard',
            component: Dashboard,
        },
        {
            path: '/home',
            component: Home
        }
    ],
});
