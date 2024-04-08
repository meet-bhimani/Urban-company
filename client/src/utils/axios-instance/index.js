import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

API.interceptors.response.use(
  (response) => {
    return {
      success: true,
      data: response.data,
      error: null,
    }
  },
  (error) => {
    console.error('Global error interceptor:', error)
    return {
      success: false,
      data: [],
      error: { message: error.message },
    }
  }
)
