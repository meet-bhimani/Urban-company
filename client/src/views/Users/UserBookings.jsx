import { useEffect, useState } from 'react'
import { getBookings } from '../../api/bookingsApi'
import { useSelector } from 'react-redux'
import HelmetHeader from '../../components/common/HelmetHeader'
import Button from '../../components/common/Button'
import { NavLink } from 'react-router-dom'
import { getAllServices } from '../../api/serviceApi'
import ServiceBookingsCard from '../../components/common/ServiceBookingsCard'

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState(null)
  const [userBookedServices, setUserBookedServices] = useState(null)

  const { user } = useSelector((state) => state.role)

  const fetchUserBookings = async () => {
    try {
      const { success, data, error } = await getBookings()
      if (!success) throw new Error(error.message || 'Error fetching bookings')
      const filteredBookings = data.filter((booking) => booking.user_id === user.id)
      setUserBookings(filteredBookings)
      fetchUserBookedServices()
    } catch (error) {
      console.error(error.message)
    }
  }

  async function fetchUserBookedServices() {
    try {
      const { success, data: services, error } = await getAllServices()
      if (!success) throw new Error(error.message || 'Error fetching services')
      const filteredServices = services.filter((service) => user.requested_services.includes(service.id))
      setUserBookedServices(filteredServices)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserBookings()
  }, [])

  return (
    <>
      <HelmetHeader
        title={'My Bookings | Urban Company'}
        description={'Check all your service booking, edit or cancel your service anytime'}
      />
      <div className="w-[min(800px,90%)] mx-auto my-10 mb-16 px-4">
        {!userBookings ? (
          <div className="flex flex-col justify-center items-center mt-48 gap-4">
            <h1 className="text-base md:text-xl lg:text-2xl">You currently don't have any bookings </h1>
            <Button variant="dark" rounded>
              <NavLink to={'/services'}>Explore Services</NavLink>
            </Button>
          </div>
        ) : (
          <div className="mt-20">
            <h1>My Bookings</h1>
            {userBookings && userBookedServices && (
              <div className="mt-4 grid grid-cols-1 gap-5">
                {userBookings.map((booking) => {
                  const service = userBookedServices.find((s) => s.id === booking.service_id)
                  if (service) return <ServiceBookingsCard booking={booking} service={service} key={booking.id} />
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default UserBookings
