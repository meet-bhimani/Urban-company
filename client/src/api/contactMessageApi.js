import { API } from '../utils/axios-instance'

export const getContactMessages = () => API.get('/contacts')

export const submitContactMessage = async (values) => {
  try {
    const {
      success: fetchContactMessagesSuccess,
      data: contactMessages,
      error: fetchContactMessagesError,
    } = await getContactMessages()
    if (!fetchContactMessagesSuccess)
      throw new Error(fetchContactMessagesError.message || 'Error fetching contact messages')
    const contactMessageObj = {
      id: (contactMessages.length + 1).toString(),
      ...values,
      reviewed: false,
      timestamp: new Date().toLocaleString(),
    }
    const {
      success: submitMessageSuccess,
      data,
      error: submitMessageError,
    } = await API.post('/contacts', contactMessageObj)
    if (!submitMessageSuccess) throw new Error(submitMessageError.message || 'Error submitting message')
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

export const markMessageReviewed = (messageId) => API.patch(`/contacts/${messageId}`, { reviewed: true })
