import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hotel } from '@/types'

export const useHotelsStore = defineStore('hotels', () => {

  const hotels = ref<Hotel[]>([])
  

  return { hotels}
},
{
  persist: {
    storage: localStorage,
    pick: ['userToken', 'user', 'isAuthenticated'],
  },
},

)
