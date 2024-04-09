import { API } from '../utils/axios-instance'
import { getBookings } from './bookingsApi'

export const getAllUsers = () => API.get('users')

export const getUserByEmail = async (email) => {
  try {
    const res = await API.get(`users/?email=${email}`)
    if (res.data.length != 0) {
      return {
        success: true,
        data: res.data,
        error: null,
      }
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
}

export const getServiceProviderById = (id) => API.get(`users/${id}`)

export const updateUser = async (user) => {
  return await API.put(`/users/${user.id}`, {
    ...user,
  })
}

export const deleteUserById = async (userId) => {
  try {
    const { success: fetchUserSuccess, data: user, error: fetchUserError } = await API.get(`/users/${userId}`)
    if (!fetchUserSuccess) throw new Error(fetchUserError.message || 'Error fetching user')
    if (user.role === 'user') {
      const { success: bookingsSuccess, data: bookingsData, error: bookingsError } = await getBookings()
      if (!bookingsSuccess) throw new Error(bookingsError?.message || 'Error fetching bookings')

      const userBookings = bookingsData.filter((booking) => booking.user_id === user.id)

      for (const booking of userBookings) {
        const providerId = booking.provider_id

        const {
          success: fetchProviderSuccess,
          data: provider,
          error: fetchProviderError,
        } = await API.get(`/users/${providerId}`)
        if (!fetchProviderSuccess) throw new Error(fetchProviderError.message || `Error fetching provider`)

        provider.accepted_services = provider.accepted_services.filter((serviceId) => serviceId !== booking.id)

        if (booking.status === 'completed') {
          provider.completed_services = provider.completed_services.filter((bookingId) => bookingId !== booking.id)
        }

        const { success: updateProviderSuccess, error: updateProviderError } = await updateUser(provider)
        if (!updateProviderSuccess) throw new Error(updateProviderError.message || `Error updating service provider`)

        const { success: deleteBookingsSuccess, error: deleteBookingsError } = await API.delete(
          `/bookings/${booking.id}`
        )
        if (!deleteBookingsSuccess) throw new Error(deleteBookingsError.message || 'Error deleting user bookings')
      }

      const { success: deleteUserSuccess, error: deleteUserError } = await API.delete(`/users/${userId}`)
      if (!deleteUserSuccess) throw new Error(deleteUserError.message || 'Error deleting user')

      return {
        success: true,
        data: [],
        error: null,
      }
    } else if (user.role === 'service_provider') {
      const { success: bookingsSuccess, data: bookingsData, error: bookingsError } = await getBookings()
      if (!bookingsSuccess) throw new Error(bookingsError?.message || 'Error fetching bookings')

      const providerBookings = bookingsData.filter((booking) => booking.provider_id === user.id)
      for (const booking of providerBookings) {
        const userId = booking.user_id

        const { success: fetchUserSuccess, data: userObj, error: fetchUserError } = await API.get(`/users/${userId}`)
        if (!fetchUserSuccess) throw new Error(fetchUserError.message || `Error fetching user`)

        userObj.requested_services = userObj.requested_services.filter((serviceId) => serviceId !== booking.service_id)
        userObj.active_bookings = userObj.active_bookings.filter((bookingId) => bookingId !== booking.id)

        const { success: updateUserSuccess, error: updateUserError } = await updateUser(userObj)
        if (!updateUserSuccess) throw new Error(updateUserError.message || `Error updating user`)

        const { success: deleteBookingsSuccess, error: deleteBookingsError } = await API.delete(
          `/bookings/${booking.id}`
        )
        if (!deleteBookingsSuccess) throw new Error(deleteBookingsError.message || 'Error deleting user bookings')
      }

      const { success: deleteProviderSuccess, error: deleteProviderError } = await API.delete(`/users/${userId}`)
      if (!deleteProviderSuccess) throw new Error(deleteProviderError.message || 'Error deleting user')

      return {
        success: true,
        data: [],
        error: null,
      }
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
}
