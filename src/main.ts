import './assets/main.css'

import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { useAuthStore } from '@/stores/Auth'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.baseURL = 'https://hoteles.test/api/'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
const store = useAuthStore()

const { isAuthenticated, userToken } = storeToRefs(store)
if (isAuthenticated.value) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`
}
