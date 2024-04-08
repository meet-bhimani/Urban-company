import { useEffect, useState } from 'react'
import HelmetHeader from '../../components/common/HelmetHeader'
import { useSelector } from 'react-redux'
import { getBookingsForServiceProvider } from '../../api/serviceApi'
import ServiceRequestCard from '../../components/common/ServiceRequestCard'

const AcceptedServices = () => {
  const [requestedServices, setRequestedServices] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [users, setUsers] = useState([])

  const { user: serviceProvider } = useSelector((state) => state.role)

  const fetchServiceRequests = async () => {
    try {
      const { success, data, error } = await getBookingsForServiceProvider(serviceProvider, 'accepted')
      if (!success) throw new Error(error.message || 'Error fetching service requests')
      setFilteredBookings(data.bookings)
      setRequestedServices(data.requestedServices)
      setUsers(data.users)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchServiceRequests()
  }, [])

  return (
    <>
      <HelmetHeader
        title={'Accepted Services | Urban Company'}
        description={'view accepted services and mark them completed if you done it or cancel the request'}
      />
      <div className="w-[85%] mx-auto my-10 mb-16">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center my-2">Accepted Service Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => {
            const user = users.find((user) => user.id === booking.user_id)
            const service = requestedServices.find((service) => service.id === booking.service_id)
            return (
              <ServiceRequestCard
                service={service}
                booking={booking}
                user={user}
                key={booking.id}
                serviceProvider={serviceProvider}
                cardType={'accepted'}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AcceptedServices
