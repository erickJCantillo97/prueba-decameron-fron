
import axios  from 'axios'
import {  AxiosError } from 'axios'
import { useHotelsStore } from '@/stores/hotels'
import { storeToRefs } from 'pinia'
import Toast from './Toats'

import type { Hotel, Room } from '@/types'
import Swal from 'sweetalert2'

const getErrorMessage = (error: string) => {
  Toast.fire({
    icon: 'error',
    title: error,
})
}

const getSuccessMessage = (message: string) => {
  Toast.fire({
    icon: 'success',
    title: message,
  })
}

export default class HotelService {
  async get() {
    const store = useHotelsStore()
    const { hotels } = storeToRefs(store)
    const { data } = await axios.get('/hotels')
    hotels.value = data.data
  }

  async create(hotel: Hotel) {
    try {

      await axios.post('/hotels', hotel)
      getSuccessMessage('Hotel Creado Correctamente')
      this.get()
      return true;
    } catch (error ) {
      if(axios.isAxiosError(error))
        getErrorMessage(error.response?.data.message)
      return false
    }
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
          getSuccessMessage('Hotel Eliminado Correctamente')
        } catch (error) {
          getErrorMessage('No podemos Eliminar Este Hotel!')
        }
      } else {
        return
      }
    })
  }

  async update(hotel: Hotel) {
    try {
      await axios.put(`/hotels/${hotel.id}`, hotel)
      getSuccessMessage('Hotel Actualizado Correctamente')
      this.get()
      return true
    } catch (error: unknown) {
      if(axios.isAxiosError(error))
        getErrorMessage(error.response?.data.message)
      return false
    }
  }

  async addRoom(id: string, room: Room) {
    try {
      const { data } = await axios.post('rooms', { ...room, hotel_id: id })
      getSuccessMessage('Acomodación Creada Correctamente')
      this.get()
    } catch (error: unknown) {
      if(axios.isAxiosError(error))
        getErrorMessage(error.response?.data.message)
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
      confirmButtonText: 'Si, Eliminar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`rooms/${id}`)
          this.get()
          getSuccessMessage('Acomodación Eliminada Correctamente')
        } catch (error) {
          getErrorMessage('No podemos Eliminar Esta Acomodación!')
        }
      }
    })
    this.get()
  }
}
