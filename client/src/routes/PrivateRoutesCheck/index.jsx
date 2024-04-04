import { Navigate, Outlet } from 'react-router-dom'

const CheckUserAuth = ({ isAuth = false }) => {
  return !isAuth ? <Outlet /> : <Navigate to="/" />
}

const PrivateRoutesForUser = ({ isAuth = false, user }) => {
  isAuth ? (isAuth = user.role === 'user' ? true : false) : ''
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

const PrivateRoutesForServiceProvider = ({ isAuth = false, user }) => {
  isAuth ? (isAuth = user.role === 'service_provider' ? true : false) : ''
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

const PrivateRoutesForAdmin = ({ isAuth = false, user }) => {
  isAuth ? (isAuth = user.role === 'admin' ? true : false) : ''
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export { CheckUserAuth, PrivateRoutesForUser, PrivateRoutesForServiceProvider, PrivateRoutesForAdmin }
