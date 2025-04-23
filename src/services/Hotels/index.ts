
import axios from 'axios'
import { useHotelsStore } from '@/stores/hotels'
import { storeToRefs } from 'pinia'

import type { Hotel, Room } from '@/types'
import Swal from 'sweetalert2'

export default class HotelService {
  async get() {
    const store = useHotelsStore()
    const { hotels } = storeToRefs(store)
    const { data } = await axios.get('/hotels')
    hotels.value = data.data
  }

  async create(hotel: Hotel) {
    await axios.post('/hotels', hotel)
    Swal.fire(
      'Cear!',
      'Hotel Creado Correctamente.',
      'success',
    )
    this.get()
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
        }
      } else {
        return
      }
    })
  }

  async update(hotel: Hotel) {
    await axios.put(`/hotels/${hotel.id}`, hotel)
    Swal.fire(
      'Actualizar!',
      'Hotel Actualizado Correctamente.',
      'success',
    )
    this.get()
  }

  async addRoom(id: string, room: Room) {
    try {

      const { data } = await axios.post('rooms', { ...room, hotel_id: id })
      Swal.fire(
        'Actualizar!',
        data.message,
        'success',
      )
      this.get()
    } catch (error: unknown) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
      console.log(error)
    }
  }

  async deleteRoom(id: string) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Eliminar esta Acomodación de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`rooms/${id}`)
          this.get()
          Swal.fire(
            'Deleted!',
            'Acomodación Eliminada.',
            'success',
          )
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No podemos Eliminar Esta Acomodación!',
          })
        }
      } else {
        return
      }
    })

    this.get()
  }
}
