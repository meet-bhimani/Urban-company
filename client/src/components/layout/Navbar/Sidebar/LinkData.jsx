import { FaHeadphonesAlt, FaHome } from 'react-icons/fa'
import { MdEventNote } from 'react-icons/md'

export const publicLinks = [
  {
    label: 'Home',
    slug: '/',
    icon: <FaHome />,
  },
  {
    label: 'My Bookings',
    slug: '/bookings',
    icon: <MdEventNote />,
  },
  {
    label: 'Contact Us',
    slug: '/contact',
    icon: <FaHeadphonesAlt />,
  },
]
