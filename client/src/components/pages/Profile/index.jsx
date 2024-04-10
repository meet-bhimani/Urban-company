import React, { useState } from 'react'
import HelmetHeader from '../../common/HelmetHeader'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../common/Button'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { updateUser } from '../../../api/usersApi'
import { setRole } from '../../../redux/actions/authAction'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useSelector((state) => state.role)
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().trim().required('Email is required').email('Please enter a valid email address'),
  })

  const initialValues = {
    name: user.name,
    email: user.email,
  }

  const onSubmit = async (values) => {
    try {
      const updatedUserObj = { ...user, name: values.name, email: values.email }
      const { success, data, error } = await updateUser(updatedUserObj)
      if (!success) throw new Error(error.message || 'Something went wrong! try again')
      dispatch(setRole(data))
      toast.success('Updated successfully')
      setIsEditing(false)
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  }

  const { values, handleChange, handleBlur, touched, errors, handleSubmit, handleReset, dirty } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const textSizeClasses = 'text-sm md:text-base mt-2'

  return (
    <>
      <HelmetHeader
        title={'My Profile | Urban Company'}
        description={'User can review their profile, or change some of the fields related to their profile like name'}
      />
      <div className="grid mt-14 place-items-center w-[80%] mx-auto mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          <div>
            <h2 className={'text-xl sm:text-2xl md:text-3xl mb-8'}>My Profile</h2>
            <div className="mt-4 space-y-2">
              <form onSubmit={handleSubmit}>
                <div>
                  <p className={`${textSizeClasses}`}>
                    <span className="font-bold mr-1">Name:</span>
                    {isEditing ? (
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="ml-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      values.name
                    )}
                  </p>
                  {touched.name && errors.name && <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.name}</p>}
                </div>
                <div>
                  <p className={`${textSizeClasses}`}>
                    <span className="font-bold mr-1">Email:</span>
                    {isEditing ? (
                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="ml-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      values.email
                    )}
                  </p>
                  {touched.email && errors.email && (
                    <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.email}</p>
                  )}
                </div>
                <p className={`${textSizeClasses}`}>
                  <span className="font-bold">Location:</span> {user.location.address_line}, {user.location.city},{' '}
                  {user.location.state}
                </p>
                {user.role === 'service_provider' && (
                  <>
                    <p className={`${textSizeClasses}`}>
                      <span className="font-bold">Role:</span> {user.role}
                    </p>
                    <p className={`${textSizeClasses}`}>
                      <span className="font-bold">Expertise:</span> {user.expertise.join(', ')}
                    </p>
                    <p className={`${textSizeClasses}`}>
                      <span className="font-bold">Brand Name:</span> {user.brand_name}
                    </p>
                    <p className={`${textSizeClasses}`}>
                      <span className="font-bold">GSTIN:</span> {user.gstin}
                    </p>
                    <p className={`${textSizeClasses}`}>
                      <span className="font-bold">Average Rating:</span> {user.average_rating}
                    </p>
                  </>
                )}
                {isEditing ? (
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={dirty ? handleSubmit : () => {}}
                      variant={dirty ? 'primary' : 'disabled'}
                      size={'sm'}
                      rounded
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        handleReset(), setIsEditing(false)
                      }}
                      variant={'danger'}
                      size={'sm'}
                      rounded
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    classNames={'mt-4'}
                    onClick={() => setIsEditing(true)}
                    variant={'primary'}
                    size={'sm'}
                    rounded
                  >
                    Edit
                  </Button>
                )}
              </form>
            </div>
          </div>
          <div className="w-[min(400px,90%)] mx-auto self-center hidden md:block">
            <img src="/images/profile-cover.gif" alt="User Profile" className="w-full" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
