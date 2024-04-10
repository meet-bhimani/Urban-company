import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { deleteServiceById, getServiceById, updateService } from '../../api/serviceApi'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputWithLabel from '../../components/common/InputWithLabel'
import Button from '../../components/common/Button'
import { MdKeyboardBackspace } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal'
import { setRole } from '../../redux/actions/authAction'

const MyServiceDetails = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { user: serviceProvider } = useSelector((state) => state.role)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchService = async () => {
    try {
      if (serviceProvider.offered_services.includes(id.toString())) {
        const { success, data } = await getServiceById(id)
        if (success && data.length !== 0) {
          setService(data)
        } else {
          navigate('/my-services')
        }
      } else {
        navigate('/my-services')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = () => {
    setShowConfirmationModal(true)
  }

  const deleteService = async (serviceId) => {
    try {
      const { success, data, error } = await deleteServiceById(serviceId)
      if (!success) throw new Error(error.message || 'Error deleting service')
      toast.success('Service deleted successfully')
      const newServiceProviderObj = {
        ...serviceProvider,
        offered_services: serviceProvider.offered_services.filter((id) => id != data.id),
        accepted_services: serviceProvider.accepted_services.filter((id) => id != data.id),
        completed_services: serviceProvider.completed_services.filter((id) => id != data.id),
      }
      dispatch(setRole(newServiceProviderObj))
      navigate('/my-services')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setShowConfirmationModal(false)
    }
  }

  useEffect(() => {
    fetchService()
  }, [id])

  useEffect(() => {
    if (service) {
      setValues({
        name: service.name || '',
        description: service.description || '',
        location: service.location || { address_line: '', city: '', state: '' },
        features: service.features.join(', ') || '',
        cost: service.cost || '',
      })
    }
  }, [service])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Service name is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.object().shape({
      address_line: Yup.string().required('Address line is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
    }),
    features: Yup.string().required('Features are required'),
    cost: Yup.number().required('Cost is required').positive('Cost must be a positive number'),
  })

  const onSubmit = async (values) => {
    try {
      const newServiceObj = { ...service, ...values, features: values.features.split(',') }
      const { success, data, error } = await updateService(newServiceObj)
      if (success) {
        setService(data)
        toast.success('Service details updated successfully!')
      } else {
        toast.error('Error updating service')
        throw new Error(error.message || 'Error updating')
      }
      setIsEditMode(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  const { setValues, values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues: {
      name: service?.name || '',
      description: service?.description || '',
      location: service?.location || { address_line: '', city: '', state: '' },
      features: service?.features || '',
      cost: service?.cost || '',
    },
    validationSchema,
    onSubmit,
  })

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <>
      <div className="w-[min(600px,90%)] mx-auto my-10 mb-16 px-4 relative">
        {!isEditMode && (
          <div className="hidden lg:block absolute -left-14 top-3 p-1 rounded-full hover:bg-secondary duration-200 text-2xl">
            <NavLink to="/my-services">
              <MdKeyboardBackspace />
            </NavLink>
          </div>
        )}
        {showConfirmationModal && (
          <ConfirmDeleteModal
            modalType={'delete'}
            dataName={'service'}
            Id={id}
            handleClick={deleteService}
            setShowConfirmationModal={setShowConfirmationModal}
          />
        )}
        <div className="flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Service Details</h1>
          {isEditMode ? (
            <form onSubmit={handleSubmit} className="mt-6">
              <InputWithLabel
                label="Service Name"
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'mt-4'}
              />
              {touched.name && errors.name && (
                <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.name}</p>
              )}
              <InputWithLabel
                label="Description"
                id="description"
                name="description"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'mt-4'}
              />
              {touched.description && errors.description && (
                <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.description}</p>
              )}
              <InputWithLabel
                label="Address Line"
                id="location.address_line"
                name="location.address_line"
                type="text"
                value={values.location.address_line}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'mt-4'}
              />
              {touched.location?.address_line && errors.location?.address_line && (
                <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.location?.address_line}</p>
              )}
              <InputWithLabel
                label="City"
                id="location.city"
                name="location.city"
                type="text"
                value={values.location.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'mt-4'}
              />
              {touched.location?.city && errors.location?.city && (
                <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.location?.city}</p>
              )}
              <InputWithLabel
                label="State"
                id="location.state"
                name="location.state"
                type="text"
                value={values.location.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'mt-4'}
              />
              {touched.location?.state && errors.location?.state && (
                <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.location?.state}</p>
              )}
              <InputWithLabel
                label="Cost"
                id="cost"
                name="cost"
                type="number"
                value={values.cost.toString()}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'mt-4'}
              />
              {touched.cost && errors.cost && (
                <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.cost}</p>
              )}
              <div className="flex flex-col">
                <InputWithLabel
                  label="Features"
                  id="features"
                  name="features"
                  type="text"
                  value={values.features}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={'mt-4'}
                />
                {touched.features && errors.features && (
                  <p className="text-danger ml-1 text-xs xsm:text-sm mt-0">{errors.features}</p>
                )}
              </div>
              <div className="flex justify-between mt-3">
                <Button type="submit" rounded>
                  Save Changes
                </Button>
                <Button type="button" onClick={toggleEditMode} variant="danger" rounded>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="py-3">
              <p className="text-lg font-semibold">Name: {service?.name}</p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Description:</span> {service?.description}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Category:</span> {service?.category}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Sub Category:</span> {service?.sub_category}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Cost:</span> {service?.cost}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Rating:</span> {service?.rating}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Total Reviews:</span> {service?.total_reviews}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Total Bookings:</span> {service?.total_bookings}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Location:</span> {service?.location.address_line},{' '}
                {service?.location.city}, {service?.location.state}
              </p>
              <p className="text-sm sm:text-base mt-2">
                <span className="font-semibold">Features:</span> {service?.features.join(', ')}
              </p>
              <div className="mt-4 flex gap-3">
                <Button onClick={toggleEditMode} rounded>
                  Edit Service
                </Button>
                <Button variant={'danger'} rounded onClick={handleDelete}>
                  Delete Service
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MyServiceDetails
