import { API } from '../utils/axios-instance'

export const getCategories = () => API.get('categories')

export const getSubCategories = async () => {
  try {
    const response = await API.get('categories')
    if (response.data.length != 0) {
      return {
        success: true,
        data: response.data.map((category) => category.sub_categories).flat(),
        error: null,
      }
    } else {
      throw new Error('sub categories not found')
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
}

export const createCategory = async (name) => {
  try {
    const { success, data, error } = await getCategories()
    if (!success) throw new Error(error.message || 'Error fetching categories')
    return await API.post('categories', {
      id: data.length + 1,
      name: name,
      thumbnail: '',
      sub_categories: [],
    })
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
}
