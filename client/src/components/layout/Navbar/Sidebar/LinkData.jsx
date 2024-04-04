import { FaTasks, FaUser, FaCheckCircle, FaUsers, FaCogs, FaHeadphonesAlt, FaHome } from 'react-icons/fa'
import { MdAccessTimeFilled, MdEventNote } from 'react-icons/md'

export const publicLinks = [
  {
    label: 'Home',
    slug: '/',
    icon: <FaHome />,
  },
  {
    label: 'Services',
    slug: '/services',
    icon: <FaCogs />,
  },
  {
    label: 'Contact Us',
    slug: '/contact',
    icon: <FaHeadphonesAlt />,
  },
]

export const userLinks = [
  {
    label: 'Home',
    slug: '/',
    icon: <FaHome />,
  },
  {
    label: 'Services',
    slug: '/services',
    icon: <FaCogs />,
  },
  {
    label: 'My Bookings',
    slug: '/user-bookings',
    icon: <MdEventNote />,
  },
  {
    label: 'My Profile',
    slug: '/user-profile',
    icon: <FaUser />,
  },
  {
    label: 'Contact Us',
    slug: '/contact',
    icon: <FaHeadphonesAlt />,
  },
]

export const serviceProviderLinks = [
  {
    label: 'Home',
    slug: '/service-provider-dashboard',
    icon: <FaHome />,
  },
  {
    label: 'My Services',
    slug: '/service-provider-services',
    icon: <FaCogs />,
  },
  {
    label: 'Service Requests',
    slug: '/requested-services',
    icon: <FaTasks />,
  },
  {
    label: 'Accepted Services',
    slug: '/accepted-services',
    icon: <MdAccessTimeFilled />,
  },
  {
    label: 'Completed Services',
    slug: '/completed-services',
    icon: <FaCheckCircle />,
  },
  {
    label: 'My Profile',
    slug: '/service-provider-profile',
    icon: <FaUser />,
  },
  {
    label: 'Contact Us',
    slug: '/contact',
    icon: <FaHeadphonesAlt />,
  },
]

export const adminLinks = [
  {
    label: 'Dashboard',
    slug: '/admin-dashboard',
    icon: <FaHome />,
  },
  {
    label: 'Manage Users',
    slug: '/manage-users',
    icon: <FaUsers />,
  },
  {
    label: 'Manage Services',
    slug: '/manage-services',
    icon: <FaCogs />,
  },
  {
    label: 'Service Requests',
    slug: '/service-requests',
    icon: <FaTasks />,
  },
  // {
  //   label: 'Service Reviews',
  //   slug: '/service-reviews',
  //   icon: <FaUsers />,
  // },
  // {
  //   label: 'User Reviews',
  //   slug: '/user-reviews',
  //   icon: <FaUsers />,
  // },
]
