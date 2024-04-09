import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CheckUserAuth,
  PrivateRoutesForAdmin,
  PrivateRoutesForServiceProvider,
  PrivateRoutesForUser,
} from './PrivateRoutesCheck'

const Layout = React.lazy(() => import('../components/layout/Layout'))
const Home = React.lazy(() => import('../views/Users/Home'))
const ServicesList = React.lazy(() => import('../views/Users/ServicesList'))
const Service = React.lazy(() => import('../views/Users/ServiceDetails'))
const ContactUs = React.lazy(() => import('../components/pages/Contact'))
const Login = React.lazy(() => import('../components/pages/Login'))
const RegisterUser = React.lazy(() => import('../components/pages/Register/RegisterUser'))
const RegisterServiceProvider = React.lazy(() => import('../components/pages/Register/RegisterServiceProvider'))
const ConfirmBooking = React.lazy(() => import('../views/Users/ConfirmBooking'))
const UserBookings = React.lazy(() => import('../views/Users/UserBookings'))
const Profile = React.lazy(() => import('../components/pages/Profile'))
const ServiceProviderDashboard = React.lazy(() => import('../views/ServiceProvider/ServiceProviderDashboard'))
const ServiceProviderServices = React.lazy(() => import('../views/ServiceProvider/ServiceProviderServices'))
const MyServiceDetails = React.lazy(() => import('../views/ServiceProvider/MyServiceDetails'))
const ServiceRequests = React.lazy(() => import('../views/ServiceProvider/ServiceRequests'))
const AcceptedServices = React.lazy(() => import('../views/ServiceProvider/AcceptedServices'))
const CompletedServices = React.lazy(() => import('../views/ServiceProvider/CompletedServices'))
const CreateNewService = React.lazy(() => import('../views/ServiceProvider/CreateNewService'))
const AdminDashboard = React.lazy(() => import('../views/Admin/AdminDashboard'))
const Users = React.lazy(() => import('../views/Admin/Users'))
const EditUser = React.lazy(() => import('../views/Admin/EditUser'))
const Services = React.lazy(() => import('../views/Admin/Services'))
const ErrorPage = React.lazy(() => import('../components/pages/ErrorPage'))

export const Router = () => {
  const { isAuth, user } = useSelector((state) => state.role)

  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/services',
          element: <ServicesList />,
        },
        {
          path: '/services/:id',
          element: <Service />,
        },
        {
          path: '/contact',
          element: <ContactUs />,
        },
        {
          element: <CheckUserAuth isAuth={isAuth} />,
          children: [
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
          ],
        },
        {
          element: <PrivateRoutesForUser isAuth={isAuth} user={user} />,
          children: [
            {
              path: '/services/:id/confirm-booking',
              element: <ConfirmBooking />,
            },
            {
              path: '/user-bookings',
              element: <UserBookings />,
            },
            {
              path: '/user-profile',
              // make sure to pass that profile from user or service provider
              element: <Profile />,
            },
          ],
        },
        {
          element: <PrivateRoutesForServiceProvider isAuth={isAuth} user={user} />,
          children: [
            {
              path: '/service-provider-dashboard',
              element: <ServiceProviderDashboard />,
            },
            {
              path: '/my-services',
              element: <ServiceProviderServices />,
            },
            {
              path: '/my-services/:id',
              element: <MyServiceDetails />,
            },
            {
              path: '/create-new-service',
              element: <CreateNewService />,
            },
            {
              path: '/requested-services',
              // make sure to pass that requested service from admin or service provider
              element: <ServiceRequests />,
            },
            {
              path: '/accepted-services',
              element: <AcceptedServices />,
            },
            {
              path: '/completed-services',
              element: <CompletedServices />,
            },
            {
              path: '/my-profile',
              // make sure to pass that profile from user or service provider
              element: <Profile />,
            },
          ],
        },
        {
          element: <PrivateRoutesForAdmin isAuth={isAuth} user={user} />,
          children: [
            {
              path: '/admin-dashboard',
              element: <AdminDashboard />,
            },
            {
              path: '/manage-users',
              element: <Users />,
            },
            {
              path: '/edit-user/:id',
              element: <EditUser />,
            },
            {
              path: '/manage-services',
              element: <Services />,
            },
            {
              path: '/admin-create-service',
              element: <CreateNewService />,
            },
            // {
            //   path: '/service-requests',
            //   // make sure to pass that requested service from admin or service provider
            //   element: <RequestedServices />,
            // },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ])
}
