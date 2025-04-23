import './assets/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { useAuthStore } from '@/stores/Auth'
import VueSweetalert2 from 'vue-sweetalert2';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


axios.defaults.baseURL = 'https://decameron.laravel.cloud/api/'
// axios.defaults.baseURL = 'https:/hoteles.test/api/'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueSweetalert2);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.directive('tooltip', Tooltip);
app.mount('#app')
const store = useAuthStore()

const { isAuthenticated, userToken } = storeToRefs(store)
if (isAuthenticated.value) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`
}
