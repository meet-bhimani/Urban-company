import { API } from '../utils/axios-instance'

export const getBookings = () => API.get('bookings')

export const updateBooking = async (bookingObj) => {
  return await API.put(`/bookings/${bookingObj.id}`, {
    ...bookingObj,
  })
}
