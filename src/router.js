import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/swap',
    name: 'SwapPage',
    component: () => import('./views/SwapPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router