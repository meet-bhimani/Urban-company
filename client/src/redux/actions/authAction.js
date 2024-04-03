export const SET_ROLE = 'SET_ROLE'
export const REMOVE_ROLE = 'REMOVE_ROLE'

export const setRole = (userObj) => {
  return {
    type: SET_ROLE,
    payload: userObj,
  }
}

export const removeRole = () => {
  return {
    type: REMOVE_ROLE,
  }
}
