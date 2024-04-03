import React from 'react'
import PrivateRoutesCheck from '../utils/PrivateRoutesCheck'
import { createBrowserRouter } from 'react-router-dom'

const Layout = React.lazy(() => import('../components/layout/Layout'))
const Login = React.lazy(() => import('../components/pages/Login'))
const ErrorPage = React.lazy(() => import('../components/pages/ErrorPage'))
const Home = React.lazy(() => import('../components/pages/Home/Home'))
const RegisterUser = React.lazy(() => import('../components/pages/Register/RegisterUser'))
const RegisterServiceProvider = React.lazy(() => import('../components/pages/Register/RegisterServiceProvider'))

export const Router = (isAuthenticated = false) => {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <RegisterUser />,
        },
        {
          path: '/register/business',
          element: <RegisterServiceProvider />,
        },
        {
          element: <PrivateRoutesCheck isAuthenticated={isAuthenticated} />,
          children: [],
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ])
}
