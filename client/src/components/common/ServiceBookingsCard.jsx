import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputWithLabel from './InputWithLabel'
import toast from 'react-hot-toast'
import { cancelBooking, updateBooking } from '../../api/bookingsApi'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { setLoader } from '../../redux/actions/appAction'

const ServiceBookingsCard = ({ booking: userBooking, service }) => {
  const [booking, setBooking] = useState(userBooking)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedLocation, setEditedLocation] = useState({
    ...booking.location,
    expected_service_date: booking.expected_service_date,
  })
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { isAuth, user } = useSelector((state) => state.role)
  const dispatch = useDispatch()

  const initialValues = {
    address_line: editedLocation.address_line,
    city: editedLocation.city,
    state: editedLocation.state,
    expected_service_date: editedLocation.expected_service_date,
  }

  const locationSchema = Yup.object({
    address_line: Yup.string().trim().required('Address Line is required'),
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().trim().required('State is required'),
    expected_service_date: Yup.date()
      .required('Date is required')
      .min(new Date(booking.expected_service_date).toISOString().split('T')[0], 'Please choose a future date'),
  })

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues,
    validationSchema: locationSchema,
    onSubmit: onSubmit,
  })

  function handleEditClick() {
    if (booking.expected_service_date === new Date().toISOString().split('T')[0]) {
      toast.error('Can not update location on expected service day')
      return
    }
    setIsEditingLocation(true)
  }

  function handleCancelEditLocationClick() {
    setIsEditingLocation(false)
    setEditedLocation({ ...booking.location, expected_service_date: booking.expected_service_date })
  }

  function handleCancelClick() {
    setShowConfirmationModal(true)
  }

  async function handleCancelBooking(id) {
    try {
      dispatch(setLoader(true))
      const { success, data, error } = await cancelBooking(userBooking, 'user')
      if (!success) throw new Error(error.message || 'Error in cancellation of booking')
      toast.success('Booking canceled successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      dispatch(setLoader(false))
      setShowConfirmationModal(false)
    }
  }

  async function onSubmit() {
    try {
      const newBookingObj = {
        ...booking,
        location: { address_line: values.address_line, city: values.city, state: values.state },
        expected_service_date: values.expected_service_date,
      }
      const { success, data, error } = await updateBooking(newBookingObj)
      if (!success) throw new Error('Something went wrong!')
      setBooking(data)
      setEditedLocation(() => {
        return { ...data.location, expected_service_date: data.expected_service_date }
      })
      setIsEditingLocation(false)
      toast.success('Updated successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {showConfirmationModal && (
        <ConfirmDeleteModal
          modalType={'cancel'}
          dataName={'booking'}
          Id={userBooking.id}
          handleClick={handleCancelBooking}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
      <div className="border-2 border-secondary p-4 rounded-md min-h-[300px] flex flex-col shadow">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-1/3 mr-4 mt-5">
            <img src={service?.thumbnail} className="w-full rounded-lg" alt={service?.name} />
          </div>
          <div className="w-full">
            <h3 className="text-lg md:text-xl mt-3">{service?.name}</h3>
            <p className="text-sm text-gray-700 line-clamp-3 mt-1">{service?.description}</p>
            <div className="flex gap-1 items-center mt-2">
              <div className="w-[12px] md:w-[16px]">
                <img src="/images/star.png" alt="rating" className="w-full" />
              </div>
              <p className="text-xs">{service?.rating}</p>
              <p className="text-xs">({service?.total_reviews} reviews)</p>
            </div>
            <p className="text-sm sm:text-base mt-2 flex gap-1 items-center">
              Cost of Service:
              <span className="font-semibold flex items-center">
                <MdOutlineCurrencyRupee />
                <span className="-ml-[2px]">{service?.cost}</span>
              </span>
            </p>
            <div>
              {isEditingLocation ? (
                <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4 mt-4">
                  <div>
                    <InputWithLabel
                      id="address_line"
                      name="address_line"
                      label="Address Line"
                      type="text"
                      value={values.address_line}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.address_line && errors.address_line
                          ? 'focus-within:border-danger focus-within:ring-danger'
                          : ''
                      }
                    />
                    {touched.address_line && errors.address_line && (
                      <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.address_line}</p>
                    )}
                  </div>
                  <div>
                    <InputWithLabel
                      id="city"
                      name="city"
                      label="City"
                      type="text"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.city && errors.city ? 'focus-within:border-danger focus-within:ring-danger' : ''
                      }
                    />
                    {touched.city && errors.city && (
                      <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <InputWithLabel
                      id="state"
                      name="state"
                      label="State"
                      type="text"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.state && errors.state ? 'focus-within:border-danger focus-within:ring-danger' : ''
                      }
                    />
                    {touched.state && errors.state && (
                      <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.state}</p>
                    )}
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="mb-1">Select expected service date:</p>
                    <InputWithLabel
                      type="date"
                      name="expected_service_date"
                      id="expected_service_date"
                      label=""
                      min={new Date(booking.expected_service_date).toISOString().split('T')[0]}
                      value={values.expected_service_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.expected_service_date && errors.expected_service_date
                          ? 'focus-within:border-danger focus-within:ring-danger w-[min(250px,100%)] lg:w-full'
                          : 'w-[min(200px,100%)] lg:w-full'
                      }
                    />
                    {touched.expected_service_date && errors.expected_service_date && (
                      <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.expected_service_date}</p>
                    )}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="success" size="sm" rounded type="submit">
                      Save
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      rounded
                      classNames="ml-2"
                      onClick={handleCancelEditLocationClick}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-sm sm:text-base mt-2">
                    Location for service:{' '}
                    <span className="text-sm">
                      {booking?.location?.address_line}, {booking?.location?.city}, {booking?.location?.state}
                    </span>
                  </p>
                  <p className="text-sm mt-1">
                    Expected Service day: <span>{booking?.expected_service_date}</span>
                  </p>
                  <p className="text-sm mt-1">
                    Booking status:{' '}
                    <span>
                      {booking?.status.charAt(0).toUpperCase() + booking?.status.slice(1)}{' '}
                      {booking?.canceled_by === 'user'
                        ? 'By User'
                        : booking?.canceled_by === 'service_provider'
                        ? 'By Service Provider'
                        : ''}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <hr className="border-b-[1.5px] border-primary border-opacity-20 border-dashed my-4" />
            <div className="mt-auto flex flex-col gap-2 md:flex-row">
              <NavLink to={`/services/${service.id}`}>
                <Button variant={'primary'} size="sm" rounded>
                  View Details
                </Button>
              </NavLink>
              <div>
                {booking?.status === 'pending' && (
                  <Button variant={'dark'} size="sm" rounded onClick={handleEditClick}>
                    Edit Booking
                  </Button>
                )}
              </div>
              <div>
                {(booking?.status === 'pending' || booking?.status === 'accepted') && (
                  <Button variant={'danger'} size="sm" rounded onClick={handleCancelClick}>
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceBookingsCard
