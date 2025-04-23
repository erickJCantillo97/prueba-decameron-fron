import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/App/Dashboard.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  if (to.name != 'login' && !isAuthenticated.value) {
    return { name: 'login' }
  }
  if (isAuthenticated.value && to.name === 'login') {
    return { name: 'dashboard' }
  }


})

export default router
