
import type { InterfaceUser } from './Auth'

interface RoomInterface {
    id: string
    hotel_id: string
    accommodation: string
    room_type: string
    total_rooms: number
}
interface HotelInterface {
    id: string
    name: string
    location: string
    city: string
    nit: string
    total_rooms: number
    rooms?: RoomInterface[]
}

export type User = InterfaceUser
export type Hotel = HotelInterface
export type Room = RoomInterface
