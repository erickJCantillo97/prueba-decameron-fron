
import axios from 'axios'
import { useHotelsStore } from '@/stores/hotels'
import { storeToRefs } from 'pinia'

import type { Hotel } from '@/types'
import Swal from 'sweetalert2'

export default class HotelService {
  async get() {
    const store = useHotelsStore()
    const { hotels } = storeToRefs(store)
    const { data } = await axios.get('/hotels')
    hotels.value = data.data
  }

  async create(hotel: Hotel) {
    const store = useHotelsStore()
    const { hotels } = storeToRefs(store)
    const { data } = await axios.post('/hotels', hotel)
    hotels.value.push(data.hotel)
  }

  async delete(id: string) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Eliminar Este hotel de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

        await axios.delete(`/hotels/${id}`)
        this.get()
        Swal.fire(
          'Deleted!',
          'Hotel Eliminado.',
          'success',
        )
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No podemos Eliminar Este Hotel!',
        })
      }} else {
        return
      }
    })
  }
}
