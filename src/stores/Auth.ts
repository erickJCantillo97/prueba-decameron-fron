import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { User } from '@/types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userToken = ref(null)
    const user = ref<User>()
    const isAuthenticated = computed(() => userToken.value !== null)
    return { user, userToken, isAuthenticated }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['userToken', 'user', 'isAuthenticated'],
    },
  },
)
