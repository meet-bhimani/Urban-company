import { API } from '../utils/axios-instance'
import { getBookings, updateBooking } from './bookingsApi'
import { getAllUsers, updateUser } from './usersApi'

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
      error: error.message,
    }
  }
}

export const getServiceById = (id) => API.get(`services/${id}`)

export const createNewService = async (values, serviceProvider) => {
  try {
    const { success: fetchServicesSuccess, data: services, error: fetchServicesError } = await getAllServices()
    if (!fetchServicesSuccess) throw new Error(fetchServicesError.message || 'Error Fetching Services')
    const newServiceId = (services.length + 1).toString()
    const newServiceObj = {
      id: newServiceId,
      name: values.name,
      description: values.description,
      thumbnail: values.thumbnail,
      provider_id: serviceProvider.id,
      category: values.category,
      sub_category: values.sub_category === '' ? values.category : values.sub_category,
      cost: values.cost,
      available: true,
      rating: 0,
      total_reviews: 0,
      total_bookings: 0,
      location: serviceProvider.location,
      features: values.features.split(','),
      offer_text: values.offer_text,
    }
    const {
      success: createServicesSuccess,
      data: newService,
      error: createServicesError,
    } = await API.post('services', {
      ...newServiceObj,
    })
    if (!createServicesSuccess) throw new Error(createServicesError.message || 'Error creating new service')
    const {
      success: updateUserSuccess,
      data: newServiceProviderObj,
      error: updateUserError,
    } = await updateUser({ ...serviceProvider, offered_services: [...serviceProvider.offered_services, newServiceId] })
    if (!updateUserSuccess) throw new Error(updateUserError.message || 'Error updating user')
    return {
      success: true,
      data: newServiceProviderObj,
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
      error: error.message,
    }
  }
}

export const deleteServiceById = async (serviceId) => {
  try {
    const { success: fetchUsersSuccess, data: users, error: fetchUsersError } = await getAllUsers()
    if (!fetchUsersSuccess) throw new Error(fetchUsersError.message || 'Error fetching users')
    users.map(async (user) => {
      if (
        user.role === 'user' &&
        (user.requested_services.includes(serviceId) || user.active_bookings.includes(serviceId))
      ) {
        // remove service if present in any array of user i.e. requested_services, active_bookings
        user.requested_services = user.requested_services.filter((id) => id !== serviceId)
        user.active_bookings = user.active_bookings.filter((id) => id !== serviceId)
        await API.put(`users/${user.id}`, { ...user })
      } else if (
        user.role === 'service_provider' &&
        (user.offered_services.includes(serviceId) ||
          user.completed_services.includes(serviceId) ||
          user.accepted_services.includes(serviceId))
      ) {
        // remove service if present in any array of service provider i.e. offered_services, completed_services, accepted_services
        user.offered_services = user.offered_services.filter((id) => id !== serviceId)
        user.completed_services = user.completed_services.filter((id) => id !== serviceId)
        user.accepted_services = user.accepted_services.filter((id) => id !== serviceId)
        await API.put(`users/${user.id}`, { ...user })
      }
    })

    // remove from bookings obj if service booked
    const { success: fetchBookingsSuccess, data: bookings, error: fetchBookingsError } = await getBookings()
    if (!fetchBookingsSuccess) throw new Error(fetchBookingsError.message || 'Error fetching bookings')
    for (const booking of bookings) {
      if (booking.service_id === serviceId) {
        await API.delete(`bookings/${booking.id}`)
      }
    }

    // remove from services
    const { success: deleteServiceSuccess, data, error: deleteServiceError } = await API.delete(`services/${serviceId}`)
    if (!deleteServiceSuccess) throw new Error(deleteServiceError.message || 'Error deleting service')
    return {
      success: true,
      data: data,
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

export const getBookingsForServiceProvider = async (serviceProvider, bookingStatus) => {
  try {
    const {
      success,
      data: bookings,
      error,
    } = await API.get(`http://localhost:3000/bookings?status=${bookingStatus}&provider_id=${serviceProvider.id}`)
    if (!success) throw new Error(error.message || 'Error fetching bookings')

    const {
      success: fetchServiceSuccess,
      data: services,
      error: fetchServiceError,
    } = await getServiceProviderServices(serviceProvider)
    if (!fetchServiceSuccess) throw new Error(fetchServiceError.message || 'Error fetching services')

    // Filter requested services based on bookings
    const requestedServicesData = services.filter((service) => {
      return bookings.some((booking) => booking.service_id === service.id)
    })

    const { success: fetchUsersSuccess, data: users, error: fetchUsersError } = await getAllUsers()
    if (!fetchUsersSuccess) throw new Error(fetchUsersError.message || 'Error fetching users')

    const filteredUsers = users.filter((user) => {
      return bookings.some((booking) => booking.user_id === user.id)
    })

    // Return the filtered bookings
    return {
      success: true,
      data: { bookings: bookings, requestedServices: requestedServicesData, users: filteredUsers },
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

export const acceptServiceRequest = async (booking, serviceProvider, user) => {
  try {
    const {
      success: updateUserSuccess,
      data: updatedUserObj,
      error: updateUserError,
    } = await updateUser({
      ...user,
      requested_services: user.requested_services.filter((serviceId) => serviceId != booking.service_id),
      active_bookings: [...user.active_bookings, booking.id],
    })
    if (!updateUserSuccess) throw new Error(updateUserError.message || 'Error updating user')

    const {
      success: updateBookingSuccess,
      data: newBookingData,
      error: updateBookingError,
    } = await updateBooking({ ...booking, status: 'accepted' })
    if (!updateBookingSuccess) throw new Error(updateBookingError.message || 'Error updating booking')

    const {
      success: updateServiceProviderSuccess,
      data: newServiceProviderObj,
      error: updateServiceProviderError,
    } = await updateUser({
      ...serviceProvider,
      accepted_services: [...serviceProvider.accepted_services, booking.id],
    })
    if (!updateServiceProviderSuccess) throw new Error(updateServiceProviderError.message || 'Error updating user')
    return {
      success: true,
      data: newServiceProviderObj,
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
