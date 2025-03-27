import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'
import Dashboard from '@/views/App/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => Dashboard,
    },
  ],
})

// router.beforeEach(async (to, from) => {
//   const isAuthenticated = await checkAuth()
//   if (isAuthenticated && to.name === 'Login') {
//     return { name: 'dashboard' }
//   } else {
//   }
// })

export default router
