import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Применяем ленивую загрузку и для главной страницы
      component: () => import('@/views/Main.vue'),
    },
    {
      // Используем kebab-case для URL
      path: '/doctors',
      name: 'ourDoctors',
      component: () => import('../views/OurDoctors.vue'),
    },
    {
      path: '/promotions',
      name: 'promotions',
      component: () => import('../views/Promotions.vue'),
    },
    {
      // Используем kebab-case для URL
      path: '/about',
      name: 'aboutUs',
      component: () => import('../views/AboutUs.vue'),
    },
  ],
})

export default router