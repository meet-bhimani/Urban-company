import { API } from '../utils/axios-instance'
import { updateUser } from './usersApi'

export const getBookings = () => API.get('bookings')

export const updateBooking = async (bookingObj) => {
  return await API.put(`/bookings/${bookingObj.id}`, {
    ...bookingObj,
  })
}

export const cancelBooking = async (bookingObj, user) => {
  try {
    // update bookings object status
    const updatedBookingObj = {
      ...bookingObj,
      status: 'canceled',
      canceled_by: 'user',
    }
    const {
      success: updateBookingSuccess,
      data: newBookingData,
      error: updateBookingError,
    } = await updateBooking(updatedBookingObj)
    if (!updateBookingSuccess) throw new Error(updateBookingError.message || 'Error updating booking')
    return {
      success: true,
      data: newBookingData,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
}
