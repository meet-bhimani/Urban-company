import { useEffect, useState } from 'react'
import { getBookings } from '../../api/bookingsApi'
import { useSelector } from 'react-redux'

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState(null)
  const { user } = useSelector((state) => state.role)

  const fetchUserBookings = async () => {
    try {
      const { success, data, error } = await getBookings()
      if (!success) throw new Error(error.message || 'Error fetching bookings')
      const filteredBookings = data.filter((booking) => booking.user_id === user.id)
      console.log(data)
      console.log(filteredBookings)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserBookings()
  }, [])
  return <div>UserBookings component</div>
}

export default UserBookings
