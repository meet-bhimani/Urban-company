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

// export const getMainCategoriesName = async () => {
//   const response = await API.get('categories')
//   return response.data.map((category) => category.name)
// }
