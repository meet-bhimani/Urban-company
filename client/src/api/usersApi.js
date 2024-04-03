import { API } from '../utils/axios-instance'

export const getAllUsers = async () => {
  try {
    const res = await API.get('users')
    return {
      success: true,
      data: res.data,
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
