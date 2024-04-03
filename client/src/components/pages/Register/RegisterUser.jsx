import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InputWithLabel from '../../common/InputWithLabel'
import Button from '../../common/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { setLoader } from '../../../redux/actions/appAction'
import HelmetHeader from '../../common/HelmetHeader'
import { registerUser } from '../../../api/registerApi'
import { getUserByEmail } from '../../../api/usersApi'
import { getAllUsers } from '../../../api/usersApi'
import { setRole } from '../../../redux/actions/authAction'
import toast from 'react-hot-toast'

const RegisterUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.role)

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: {
      addressLine: '',
      city: '',
      state: '',
    },
  }

  const registerSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().trim().required('Email is required').email('Please enter a valid email address'),
    password: Yup.string().trim().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    location: Yup.object().shape({
      addressLine: Yup.string().required('Address line is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
    }),
  })

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit,
  })

  async function onSubmit() {
    try {
      dispatch(setLoader(true))
      const { name, email, password, location } = values
      const { success } = await getUserByEmail(email)

      if (!success) {
        const users = await getAllUsers()
        const userObj = {
          id: String(users.data.length + 1),
          name,
          email,
          password,
          role: 'user',
          location,
        }
        const { success: registerSuccess, data, error } = await registerUser(userObj)
        if (registerSuccess) {
          dispatch(setRole(data))
          toast.success('Registration successful')
        } else {
          toast.error(error)
        }
      } else {
        toast.error('User already exists')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    isAuth ? navigate('/') : ''
  }, [isAuth])

  return (
    <>
      <HelmetHeader
        title={'Register | Urban Company'}
        description={'Register to Urban Company - create an account to explore and book professional services at home'}
      />
      <div className="grid mt-14 place-items-center w-[90%] mx-auto mb-14">
        <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-2 text-center">Register for Urban Company</h2>
        <p className="text-xs xsm:text-sm text-center mb-6">
          Want to register as a service provider?
          <NavLink to="/register/business" className="ml-1 text-primary hover:underline transition">
            Register here
          </NavLink>
        </p>
        <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4 w-[min(90%,550px)]">
          <div>
            <InputWithLabel
              id="name"
              name="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? 'focus-within:border-danger focus-within:ring-danger' : ''}
            />
            {touched.name && errors.name && <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.name}</p>}
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
              className={touched.email && errors.email ? 'focus-within:border-danger focus-within:ring-danger' : ''}
            />
            {touched.email && errors.email && <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.email}</p>}
          </div>
          <div>
            <InputWithLabel
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              passwordEye={true}
              className={
                touched.password && errors.password ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
            />
            {touched.password && errors.password && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <InputWithLabel
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              passwordEye={true}
              className={
                touched.confirmPassword && errors.confirmPassword
                  ? 'focus-within:border-danger focus-within:ring-danger'
                  : ''
              }
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <InputWithLabel
              id="location.addressLine"
              name="location.addressLine"
              label="Address Line"
              type="text"
              value={values.location.addressLine}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.location?.addressLine && errors.location?.addressLine
                  ? 'focus-within:border-danger focus-within:ring-danger'
                  : ''
              }
            />
            {touched.location?.addressLine && errors.location?.addressLine && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.location?.addressLine}</p>
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

          <div className="flex justify-between items-center flex-wrap">
            <div className="flex gap-3 justify-between items-center">
              <Button variant={'primary'} rounded type="submit">
                Register
              </Button>
              <Button variant={'danger-outline'} rounded type="reset">
                Reset
              </Button>
            </div>
            <p className="text-xs xsm:text-sm mt-2 xsm:mt-0">
              Already have an account?
              <NavLink to="/login" className="ml-1 text-primary hover:underline transition">
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterUser
