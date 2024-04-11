import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import InputWithLabel from '../../common/InputWithLabel'
import Button from '../../common/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import HelmetHeader from '../../common/HelmetHeader'
import { registerUser } from '../../../api/registerApi'
import { getAllUsers, getUserByEmail } from '../../../api/usersApi'
import toast from 'react-hot-toast'
import { setRole } from '../../../redux/actions/authAction'

const RegisterServiceProvider = () => {
  const dispatch = useDispatch()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    brandName: '',
    gstin: '',
    expertise: '',
    location: {
      address_line: '',
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
    brandName: Yup.string().required('Brand name is required'),
    gstin: Yup.string().required('GSTIN is required'),
    expertise: Yup.string().required('Expertise is required'),
    location: Yup.object().shape({
      address_line: Yup.string().required('Address line is required'),
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
      const { name, email, password, brandName, gstin, expertise, location } = values
      const { success } = await getUserByEmail(email)

      if (!success) {
        const users = await getAllUsers()
        const userObj = {
          id: String(users.data.length + 1),
          name: name,
          email: email,
          password: password,
          brand_name: brandName,
          gstin: gstin,
          role: 'service_provider',
          expertise: expertise.split(','),
          location: {
            address_line: location.address_line,
            city: location.city,
            state: location.state,
          },
          offered_services: [],
          accepted_services: [],
          completed_services: [],
          average_rating: 0,
          status: 'active',
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
    }
  }

  return (
    <>
      <HelmetHeader
        title={'Register Service Provider | Urban Company'}
        description={
          'Register as a service provider on Urban Company - create an account to offer professional services to customers'
        }
      />
      <div className="grid mt-14 place-items-center w-[90%] mx-auto mb-14">
        <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-6 text-center">Register as Service Provider</h2>
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
              id="brandName"
              name="brandName"
              label="Brand Name"
              type="text"
              value={values.brandName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.brandName && errors.brandName ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
            />
            {touched.brandName && errors.brandName && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.brandName}</p>
            )}
          </div>
          <div>
            <InputWithLabel
              id="gstin"
              name="gstin"
              label="GSTIN"
              type="text"
              value={values.gstin}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.gstin && errors.gstin ? 'focus-within:border-danger focus-within:ring-danger' : ''}
            />
            {touched.gstin && errors.gstin && <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.gstin}</p>}
          </div>
          <div>
            <InputWithLabel
              id="expertise"
              name="expertise"
              label="Expertise"
              type="text"
              value={values.expertise}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.expertise && errors.expertise ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
              placeholder={'i.e. Plumbing, House cleaning, Gardening'}
            />
            {touched.expertise && errors.expertise && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.expertise}</p>
            )}
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

export default RegisterServiceProvider
