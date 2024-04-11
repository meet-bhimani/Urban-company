import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { bookService, getServiceById } from '../../api/serviceApi'
import HelmetHeader from '../../components/common/HelmetHeader'
import { MdKeyboardBackspace, MdLocalOffer, MdOutlineCurrencyRupee } from 'react-icons/md'
import InputWithLabel from '../../components/common/InputWithLabel'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../components/common/Button'
import toast from 'react-hot-toast'
import { setRole } from '../../redux/actions/authAction'

const ConfirmBooking = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const { isAuth, user } = useSelector((state) => state.role)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    name: user.name,
    email: user.email,
    location: user.location,
    expected_service_date: '',
    notes: '',
  }

  const loginSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().trim().required('Email is required').email('Please enter a valid email address'),
    location: Yup.object().shape({
      address_line: Yup.string().required('Address line is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
    }),
    expected_service_date: Yup.date()
      .required('Date is required')
      .min(new Date().toISOString().split('T')[0], 'Please choose a future date'),
  })

  const onSubmit = async (values) => {
    try {
      const { success, data, error } = await bookService(values, user, service)
      if (!success) throw new Error(error.message || 'Failed to book service, try again after sometime')
      dispatch(setRole(data))
      toast.success('Service Booked')
      navigate('/user-bookings')
    } catch (error) {
      toast.error(error?.message)
    }
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  })

  const fetchService = async (id) => {
    try {
      const { success, data } = await getServiceById(id)
      if (success && data.length != 0 && data?.available) {
        setService(data)
      } else if (!data?.available) {
        navigate(`/services/${id}`)
      } else {
        navigate('/services')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchService(id)
  }, [id])

  return (
    <>
      <HelmetHeader
        title={`Confirm Booking | Urban Company`}
        description={'Provide and confirm basic details before booking service'}
      />
      <div className="w-[min(800px,90%)] mx-auto my-10 mb-16 px-4 relative">
        <div className="hidden lg:block absolute -left-14 top-3 p-1 rounded-full hover:bg-secondary duration-200 text-2xl">
          <NavLink to={`/services/${id}`}>
            <MdKeyboardBackspace />
          </NavLink>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* confirm booking form  */}
          <div>
            <h1 className="text-xl md:text-2xl">Confirm Basic Details</h1>
            <form onSubmit={handleSubmit} onReset={handleReset} className="mt-6 space-y-4">
              <div>
                <InputWithLabel
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly
                  className={'focus-within:border-secondary focus-within:ring-0 text-gray-400'}
                />
              </div>
              <div>
                <InputWithLabel
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly
                  className={'focus-within:border-secondary focus-within:ring-0 text-gray-400'}
                />
              </div>
              <div>
                <InputWithLabel
                  id="location.address_line"
                  name="location.address_line"
                  label="Address Line"
                  type="text"
                  value={values.location.address_line}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    touched.location?.address_line && errors.location?.address_line
                      ? 'focus-within:border-danger focus-within:ring-danger'
                      : ''
                  }
                />
                {touched.location?.address_line && errors.location?.address_line && (
                  <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.location?.address_line}</p>
                )}
              </div>
              <div>
                <InputWithLabel
                  id="location.city"
                  name="location.city"
                  label="City"
                  type="text"
                  value={values.location.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    touched.location?.city && errors.location?.city
                      ? 'focus-within:border-danger focus-within:ring-danger'
                      : ''
                  }
                />
                {touched.location?.city && errors.location?.city && (
                  <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.location?.city}</p>
                )}
              </div>
              <div>
                <InputWithLabel
                  id="location.state"
                  name="location.state"
                  label="State"
                  type="text"
                  value={values.location.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    touched.location?.state && errors.location?.state
                      ? 'focus-within:border-danger focus-within:ring-danger'
                      : ''
                  }
                />
                {touched.location?.state && errors.location?.state && (
                  <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.location?.state}</p>
                )}
              </div>
            </form>
          </div>

          {/* service details  */}
          <div className="px-4">
            <h1 className="text-xl md:text-2xl">Service Details</h1>
            {service && (
              <>
                <div className="flex items-center space-x-4 mt-4">
                  <img src={service.thumbnail} alt={service.name} className="w-24 h-24 rounded-lg" />
                  <div>
                    <h2 className="text-lg font-semibold">{service.name}</h2>
                    <div className="flex gap-1 items-center">
                      <div className="w-[12px]">
                        <img src="/images/star.png" alt="rating" className="w-full" />
                      </div>
                      <p className="text-xs">{service?.rating}</p>
                      <p className="text-xs">({service?.total_reviews} reviews)</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Location:</span> {service.location.address_line},{' '}
                      {service.location.city}, {service.location.state}
                    </p>
                  </div>
                </div>
                <hr className="my-2 border-b-2 border-dashed" />
                <div>
                  <p className="text-sm text-gray-700 flex">
                    <span className="font-semibold">Cost:</span>
                    <span className="font-semibold flex items-center">
                      <MdOutlineCurrencyRupee />
                      <span className="-ml-[2px]">{service?.cost}</span>
                    </span>
                  </p>
                </div>
                {service?.offer_text && (
                  <div className="text-success mt-1 text-xs flex gap-1 items-center justify-start">
                    <MdLocalOffer /> {service.offer_text}
                  </div>
                )}
                <div className="mt-2 text-sm">
                  <p className="mb-1">Select expected service date:</p>
                  <InputWithLabel
                    type="date"
                    name="expected_service_date"
                    id="expected_service_date"
                    label=""
                    min={new Date().toISOString().split('T')[0]}
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
                <div className="mt-2 text-sm">
                  <p className="mb-1">Instructions:</p>
                  <textarea
                    name="notes"
                    id="notes"
                    rows="3"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" rounded-md border border-gray-200 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary
                    w-[min(250px,100%)] lg:w-full focus:outline-none px-2 py-1"
                  />
                </div>
              </>
            )}
            <div className="flex justify-start mt-4">
              <Button variant={'primary'} rounded type="submit" onClick={handleSubmit}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmBooking
