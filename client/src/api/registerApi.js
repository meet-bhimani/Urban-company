import { API } from '../utils/axios-instance'

export const registerUser = (userObj) => API.post('users', userObj)
