import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InputWithLabel from '../../common/InputWithLabel'
import Button from '../../common/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getUserByEmail } from '../../../api/loginApi'
import { setLoader } from '../../../redux/actions/appAction'
import { setRole } from '../../../redux/actions/authAction'
import HelmetHeader from '../../common/HelmetHeader'
import toast from 'react-hot-toast'

const Login = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
  }

  const loginSchema = Yup.object({
    email: Yup.string().trim().required('email is required').email('please enter valid email address'),
    password: Yup.string().trim().required('password is required'),
  })

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  })

  async function onSubmit() {
    try {
      dispatch(setLoader(true))
      const { email, password } = values
      // check for user exists in database or not
      const { success, data, error } = await getUserByEmail(email)
      if (success) {
        if (data[0].password === password) {
          dispatch(setRole(data[0]))
          toast.success(`Welcome, ${data[0].name}`)
          navigate('/')
        } else {
          toast.error('Invalid credentials')
        }
      } else {
        toast.error(error)
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
        title={'Login | Urban Company'}
        description={'Login to Urban Company - explore and book expert professional services at home'}
      />
      <div className="grid mt-14 place-items-center w-[90%] mx-auto">
        <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-6 text-center">Login to Urban Company</h2>
        <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4 w-[min(90%,550px)]">
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
            {touched.email && errors.email && (
              <p className="text-danger ml-1 text-xs xsm:text-sm md:text-base">{errors.email}</p>
            )}
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
              <p className="text-danger ml-1 text-xs xsm:text-sm md:text-base">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center flex-wrap">
            <div className="flex gap-3 justify-between items-center">
              <Button variant={'primary'} rounded type="submit">
                Login
              </Button>
              <Button variant={'danger-outline'} rounded type="reset">
                Reset
              </Button>
            </div>
            <p className="text-xs xsm:text-sm md:text-base mt-2 xsm:mt-0">
              Don't have account yet?
              <NavLink to="/register" className="ml-1 text-primary hover:underline transition">
                SignUp
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
