import { useEffect, useState } from 'react'
import { getBookings } from '../../api/bookingsApi'
import { useSelector } from 'react-redux'
import HelmetHeader from '../../components/common/HelmetHeader'
import Button from '../../components/common/Button'
import { NavLink } from 'react-router-dom'
import { getAllServices } from '../../api/serviceApi'
import ServiceBookingsCard from '../../components/common/ServiceBookingsCard'
import Loader from '../../components/common/Loader'

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([])
  const [userBookedServices, setUserBookedServices] = useState([])
  const { loader } = useSelector((state) => state.app)
  const { user } = useSelector((state) => state.role)

  const fetchData = async () => {
    try {
      const { success: bookingsSuccess, data: bookingsData, error: bookingsError } = await getBookings()
      if (!bookingsSuccess) throw new Error(bookingsError?.message || 'Error fetching bookings')

      const filteredBookings = bookingsData.filter((booking) => booking.user_id === user.id)
      setUserBookings(filteredBookings)

      const { success: servicesSuccess, data: servicesData, error: servicesError } = await getAllServices()
      if (!servicesSuccess) throw new Error(servicesError?.message || 'Error fetching services')

      const filteredServices = servicesData.filter(
        (service) =>
          user.requested_services.includes(service.id) ||
          filteredBookings.some((booking) => booking.service_id === service.id)
      )
      setUserBookedServices(filteredServices)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.id])

  return (
    <>
      {loader && <Loader />}
      <HelmetHeader
        title={'My Bookings | Urban Company'}
        description={'Check all your service booking, edit or cancel your service anytime'}
      />
      <div className="w-[min(800px,90%)] mx-auto my-10 mb-16 px-4">
        {userBookings.length === 0 || userBookedServices.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-48 gap-4">
            <h1 className="text-base md:text-xl lg:text-2xl">You currently don't have any bookings </h1>
            <Button variant="dark" rounded>
              <NavLink to={'/services'}>Explore Services</NavLink>
            </Button>
          </div>
        ) : (
          <div className="mt-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-center">My Bookings</h1>
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
