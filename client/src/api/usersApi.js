import { API } from '../utils/axios-instance'

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
