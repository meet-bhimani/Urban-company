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

    // update fields of service provider
    const {
      success: fetchServiceProviderSuccess,
      data: serviceProvider,
      error: fetchServiceProviderError,
    } = await API.get(`users/${bookingObj.provider_id}`)
    if (!fetchServiceProviderSuccess)
      throw new Error(fetchServiceProviderError.message || 'Error fetching Service Provider')

    const updatedServiceProviderObj = {
      ...serviceProvider,
      accepted_services: serviceProvider.accepted_services.filter((id) => id != bookingObj.service_id),
      completed_services: serviceProvider.completed_services.filter((id) => id != bookingObj.service_id),
    }

    const {
      success: updateServiceProviderSuccess,
      data: newServiceProviderData,
      error: updateServiceProviderError,
    } = await updateUser(updatedServiceProviderObj)
    if (!updateServiceProviderSuccess) throw new Error(updateServiceProviderError.message || 'Error updating user')

    // update fields of user
    const updatedUserObj = {
      ...user,
      requested_services: user.requested_services.filter((id) => id != bookingObj.service_id),
      active_services: user.active_services.filter((id) => id != bookingObj.service_id),
    }
    const { success: updateUserSuccess, data: newUserData, error: updateUserError } = await updateUser(updatedUserObj)
    if (!updateUserSuccess) throw new Error(updateUserError.message || 'Error updating user')
    return {
      success: true,
      data: newUserData,
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
