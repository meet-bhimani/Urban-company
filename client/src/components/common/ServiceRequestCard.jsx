import { useDispatch } from 'react-redux'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import Button from './Button'
import toast from 'react-hot-toast'
import { acceptServiceRequest, declineServiceRequest } from '../../api/serviceApi'
import { setRole } from '../../redux/actions/authAction'
import { cancelBooking, completeService } from '../../api/bookingsApi'

const ServiceRequestCard = ({ service, booking, user, serviceProvider, cardType }) => {
  const dispatch = useDispatch()

  const handleAcceptClick = async () => {
    try {
      const { success, data, error } = await acceptServiceRequest(booking, serviceProvider, user)
      if (!success) throw new Error(error.message || 'Error accepting service')
      dispatch(setRole(data))
      toast.success('Service Accepted Successfully')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong! try again')
    }
  }

  const handleDeclineClick = async () => {
    try {
      const { success, data, error } = await declineServiceRequest(booking)
      if (!success) throw new Error(error.message || 'Error Declining service')
      toast.success('Service Declined Successfully')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong! try again here')
    }
  }
  const handleCompleteClick = async () => {
    try {
      const { success, data, error } = await completeService(booking, serviceProvider)
      if (!success) throw new Error(error.message || 'Error in completing service')
      toast.success('Booking Completed successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  const handleCancelClick = async () => {
    try {
      const { success, data, error } = await cancelBooking(booking, 'service_provider')
      if (!success) throw new Error(error.message || 'Error in cancellation of booking')
      toast.success('Booking canceled successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  return (
    <>
      <div className="border-2 border-secondary p-4 rounded-md min-h-[300px] flex shadow mb-4">
        <div className="flex flex-col justify-center">
          <div className="w-[min(200px,100%)] mt-5">
            <img src={service?.thumbnail} className="w-full rounded-lg" alt={service?.name} />
          </div>
          <div className="w-full px-2">
            <h3 className="text-lg md:text-xl mt-3 font-semibold">{service?.name}</h3>
            <p className="text-sm mt-2 flex gap-1 items-center">
              Cost of Service:
              <span className="font-semibold flex items-center">
                <MdOutlineCurrencyRupee />
                <span className="-ml-[2px]">{service?.cost}</span>
              </span>
            </p>
            <div>
              <div>
                <p className="text-sm sm:text-base mt-2">
                  Requested by: <span className="font-semibold">{user?.name}</span>
                </p>
                <p className="text-sm mt-1">
                  Email: <span className="font-semibold">{user?.email}</span>
                </p>
                <p className="text-sm sm:text-base mt-2">
                  Location for service:{' '}
                  <span className="text-sm">
                    {booking?.location?.addressLine}, {booking?.location?.city}, {booking?.location?.state}
                  </span>
                </p>
                <p className="text-sm mt-1">
                  Expected Service day: <span>{booking?.expected_service_date}</span>
                </p>
                {booking?.notes != '' && (
                  <p className="text-sm mt-1">
                    Instructions: <span>{booking?.notes}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 md:flex-row">
              {cardType === 'requested' && (
                <>
                  <div>
                    <Button variant={'primary'} size="sm" rounded onClick={handleAcceptClick}>
                      Accept
                    </Button>
                  </div>
                  <div>
                    <Button variant={'danger'} size="sm" rounded onClick={handleDeclineClick}>
                      Decline
                    </Button>
                  </div>
                </>
              )}
              {cardType === 'accepted' && (
                <>
                  <div>
                    <Button variant={'success'} size="sm" rounded onClick={handleCompleteClick}>
                      Mark Done
                    </Button>
                  </div>
                  <div>
                    <Button variant={'danger'} size="sm" rounded onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceRequestCard
