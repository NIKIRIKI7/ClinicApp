import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/OurDoctors',
      name: 'ourDoctors',
      component: () => import('../views/OurDoctors.vue'),
    },
    {
      path: '/Promotions',
      name: 'promotions',
      component: () => import('../views/Promotions.vue'),
    },
    {
      path: '/AboutUs',
      name: 'aboutUs',
      component: () => import('../views/AboutUs.vue'),
    },
  ],
})

export default router
