import { API } from '../utils/axios-instance'

export const getBookings = () => API.get('bookings')
