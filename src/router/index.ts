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
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => Dashboard,
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  console.log(isAuthenticated.value)
  if (to.name != 'login' && !isAuthenticated.value) {
    return { name: 'login' }
  }
  if (isAuthenticated.value && to.name === 'login') {
    return { name: 'dashboard' }
  }


})

export default router
