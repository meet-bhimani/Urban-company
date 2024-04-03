import useLocalStorage from '../../utils/custom-hooks/useLocalStorage'
import { REMOVE_ROLE, SET_ROLE } from '../actions/authAction'

const { setItem, getItem, removeItem } = useLocalStorage('role')

const initialState = getItem() || {
  isAuth: false,
  user: null,
}

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE: {
      const newState = { ...state, isAuth: true, user: action.payload }
      setItem(newState)
      return newState
    }

    case REMOVE_ROLE: {
      removeItem('role')
      return {
        isAuth: false,
        user: null,
      }
    }

    default: {
      return state
    }
  }
}

export { roleReducer }
