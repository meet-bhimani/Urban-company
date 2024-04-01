export const SET_LOADER = 'SET_LOADER'

export const setLoader = (status) => {
  return {
    type: SET_LOADER,
    payload: status,
  }
}
