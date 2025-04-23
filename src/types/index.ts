
import type { InterfaceUser } from './Auth'

interface HotelInterface {
    name: string
    location: string
    city: string
    nit: string
    total_rooms: number
}

export type User = InterfaceUser
export type Hotel = HotelInterface