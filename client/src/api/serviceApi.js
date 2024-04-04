import { API } from '../utils/axios-instance'

export const getAllServices = () => API.get('services')

export const getServiceById = (id) => API.get(`services/${id}`)
