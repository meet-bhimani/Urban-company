import React from 'react'
import PrivateRoutesCheck from '../utils/PrivateRoutesCheck'
import Nested from '../components/pages/Dashboard/Nested'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const Layout = React.lazy(() => import('../components/layout/Layout'))
const Dashboard = React.lazy(() => import('../components/pages/Dashboard/Dashboard'))
const Login = React.lazy(() => import('../components/pages/Login'))
const ErrorPage = React.lazy(() => import('../components/pages/ErrorPage'))
const Home = React.lazy(() => import('../components/pages/Home/Home'))
const About = React.lazy(() => import('../components/pages/About/About'))
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
          element: <PrivateRoutesCheck isAuthenticated={isAuthenticated} />,
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />,
              children: [
                {
                  path: 'nested',
                  element: <Nested />,
                },
              ],
            },
            {
              path: 'about',
              element: <About />,
            },
          ],
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ])
}
