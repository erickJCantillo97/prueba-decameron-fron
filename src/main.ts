import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'

axios.defaults.baseURL = 'https://avcolombia.net/api'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
const store = useAuthStore()

const { isAuthenticated, userToken } = storeToRefs(store)
if (isAuthenticated.value) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`
}
