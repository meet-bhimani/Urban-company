import React from 'react'
import PrivateRoutesCheck from '../utils/PrivateRoutesCheck'
import { createBrowserRouter } from 'react-router-dom'

const Layout = React.lazy(() => import('../components/layout/Layout'))
const Login = React.lazy(() => import('../components/pages/Login'))
const ErrorPage = React.lazy(() => import('../components/pages/ErrorPage'))
const Home = React.lazy(() => import('../components/pages/Home/Home'))
const Register = React.lazy(() => import('../components/pages/Register'))

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
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
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
