import {createRouter, createWebHistory} from 'vue-router';
import type {RouteLocationRaw} from 'vue-router';

interface Breadcrumb {
  text: string;
  to?: RouteLocationRaw;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Main.vue'),
      meta: {
        title: 'О КЛИНИКЕ',
        breadcrumbs: [{text: 'Главная'}] as Breadcrumb[],
      },
    },
    {
      path: '/doctors',
      name: 'ourDoctors',
      component: () => import('../views/OurDoctors.vue'),
      meta: {
        title: 'НАШИ ВРАЧИ',
        breadcrumbs: [
          {text: 'Главная', to: '/'},
          {text: 'Наши врачи'},
        ] as Breadcrumb[],
      }
    },
    {
      path: '/promotions',
      name: 'promotions',
      component: () => import('../views/Promotions.vue'),
      meta: {
        title: 'АКЦИИ',
        breadcrumbs: [
          {text: 'Главная', to: '/'},
          {text: 'Акции'},
        ] as Breadcrumb[],
      }
    },
    {
      path: '/about',
      name: 'aboutUs',
      component: () => import('../views/AboutUs.vue'),
      meta: {
        title: 'О КЛИНИКЕ',
        breadcrumbs: [
          {text: 'Главная', to: '/'},
          {text: 'О нас'},
        ] as Breadcrumb[],
      }
    }
  ],
});

export default router;