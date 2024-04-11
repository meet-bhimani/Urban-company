import { useEffect, useState } from 'react'
import { getBookings } from '../../api/bookingsApi'
import { useSelector } from 'react-redux'
import HelmetHeader from '../../components/common/HelmetHeader'
import Button from '../../components/common/Button'
import { NavLink } from 'react-router-dom'
import { getAllServices } from '../../api/serviceApi'
import ServiceBookingsCard from '../../components/common/ServiceBookingsCard'
import useFilter from '../../utils/custom-hooks/useFilter'

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([])
  const [userBookedServices, setUserBookedServices] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({ status: 'all' })
  const { user } = useSelector((state) => state.role)

  const { filteredData: filteredBookings } = useFilter(userBookings, filterCriteria)

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
      <HelmetHeader
        title={'My Bookings | Urban Company'}
        description={'Check all your service booking, edit or cancel your service anytime'}
      />
      <div className="w-[min(800px,90%)] mx-auto my-10 mb-16 px-4">
        {filteredBookings.length === 0 || userBookedServices.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-48 gap-4">
            <h1 className="text-base md:text-xl lg:text-2xl">
              You currently don't have any {filterCriteria?.status} bookings
            </h1>
            {filterCriteria.status === 'all' && (
              <Button variant="dark" rounded>
                <NavLink to={'/services'}>Explore Services</NavLink>
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-center">My Bookings</h1>
              <div className="flex justify-center items-center">
                <label className="text-sm">Filter by Status:</label>
                <select
                  value={filterCriteria.status}
                  onChange={(e) => setFilterCriteria({ status: e.target.value })}
                  className="p-1 text-sm ml-1 border-2 rounded-md outline-none border-primary"
                >
                  <option value="all" selected>
                    All
                  </option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>

            {filteredBookings && userBookedServices && (
              <div className="mt-4 grid grid-cols-1 gap-5">
                {filteredBookings.map((booking) => {
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
