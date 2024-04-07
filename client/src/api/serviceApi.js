import { API } from '../utils/axios-instance'
import { getBookings } from './bookingsApi'
import { updateUser } from './usersApi'

export const getAllServices = () => API.get('services')

export const getServiceProviderServices = async (serviceProvider) => {
  try {
    const { success: fetchServicesSuccess, data: services, error: fetchServicesError } = await getAllServices()
    if (!fetchServicesSuccess) throw new Error(fetchServicesError.message || 'Error Fetching Services')
    const serviceProviderServices = services.filter((service) => serviceProvider.offered_services.includes(service.id))
    return {
      success: true,
      data: serviceProviderServices,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message + 'else part',
    }
  }
}

export const getServiceById = (id) => API.get(`services/${id}`)

export const updateService = (service) => API.put(`services/${service.id}`, { ...service })

export const bookService = async (values, user, service) => {
  try {
    const { success: fetchBookingsSuccess, data: bookings, error: fetchBookingsError } = await getBookings()
    if (!fetchBookingsSuccess) throw new Error(fetchBookingsError.message || 'Error Fetching Bookings')
    const newBookingObj = {
      id: (bookings.length + 1).toString(),
      user_id: user.id,
      service_id: service.id,
      provider_id: service.provider_id,
      booking_date: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: values.notes,
      expected_service_date: values.expected_service_date,
      location: values.location,
    }
    const newUserObj = {
      ...user,
      'requested_services': [...user.requested_services, service.id],
    }
    const { success: addBookingsSuccess, error: addBookingsError } = await API.post('/bookings', newBookingObj)
    if (!addBookingsSuccess) throw new Error(addBookingsError.message || 'Error adding new booking')

    const { success: updateUserSuccess, data: newUserData, error: updateUserError } = await updateUser(newUserObj)
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
      error: error.message + 'else part',
    }
  }
}
