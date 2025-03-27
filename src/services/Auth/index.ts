import axios from 'axios'
import type { User } from '@/types'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'
import router from '@/router'

export default class AuthService {
  async login(email: string, password: string) {
    const store = useAuthStore()
    const { user, userToken } = storeToRefs(store)
    const { data } = await axios.post('/login', { email, password })
    user.value = data.user
    userToken.value = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    router.push('dashboard')
    // user.value = data.User
  }

  async logout() {
    const store = useAuthStore()
    const { user, userToken } = storeToRefs(store)
    await axios.post('/logout')
    user.value = undefined
    userToken.value = null
    axios.defaults.headers.common['Authorization'] = null
    router.push('/login')
  }
}
