import { API } from '../utils/axios-instance'
import { updateUser } from './usersApi'

export const getBookings = () => API.get('bookings')

export const updateBooking = async (bookingObj) => {
  return await API.put(`/bookings/${bookingObj.id}`, {
    ...bookingObj,
  })
}

export const cancelBooking = async (bookingObj, canceled_by) => {
  try {
    // update bookings object status
    const updatedBookingObj = {
      ...bookingObj,
      status: 'canceled',
      canceled_by: canceled_by,
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

export const completeService = async (bookingObj, serviceProvider) => {
  try {
    const {
      success: updateUserSuccess,
      data: newServiceProviderObj,
      error: updateUserError,
    } = await updateUser({
      ...serviceProvider,
      accepted_services: serviceProvider.accepted_services.filter((bookingId) => bookingId != bookingObj.id),
      completed_services: [...serviceProvider.completed_services, bookingObj.id],
    })
    if (!updateUserSuccess) throw new Error(updateUserError.message || 'Error updating user')

    const {
      success: updateBookingSuccess,
      data: newBookingData,
      error: updateBookingError,
    } = await updateBooking({ ...bookingObj, status: 'completed' })
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
