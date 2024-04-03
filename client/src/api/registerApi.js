import { API } from '../utils/axios-instance'

export const registerUser = async (userObj) => {
  try {
    const res = await API.post('users', userObj)
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
