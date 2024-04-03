import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { roleReducer } from './authReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  role: roleReducer,
})
