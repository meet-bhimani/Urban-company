import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputWithLabel from '../../common/InputWithLabel'
import Button from '../../common/Button'
import HelmetHeader from '../../common/HelmetHeader'
import { twMerge } from 'tailwind-merge'
import { submitContactMessage } from '../../../api/contactMessageApi'
import toast from 'react-hot-toast'

const ContactUs = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth && user.role === 'admin') navigate('/')
  }, [])

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().trim().required('Email is required').email('Please enter a valid email address'),
    message: Yup.string().required('Message is required').min(30, 'Message must be at least 10 characters'),
  })

  const onSubmit = async (values) => {
    try {
      const { success, error } = await submitContactMessage(values)
      if (!success) throw new Error(error.message || 'Error sending message')
      toast.success('Message send successfully')
      handleReset()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong! try again')
    }
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema,
    onSubmit,
  })

  return (
    <>
      <HelmetHeader
        title={'Contact | Urban Company'}
        description={
          'Feel free to reach out to us if you have anything related to privacy&security or have any other issue regarding Urban Company platform'
        }
      />
      <div className="grid mt-14 place-items-center w-[90%] mx-auto mb-14">
        <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-6 text-center">Contact Us</h2>
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
              id="phone"
              name="phone"
              label="Phone (Optional)"
              type="text"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="mt-2 text-sm">
            <p className="mb-1">Message:</p>
            <textarea
              name="message"
              id="message"
              rows="3"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={twMerge(
                'w-full rounded-md border border-gray-200 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary lg:w-full focus:outline-none px-2 py-1',
                touched.message && errors.message ? ' focus:border-danger  focus:ring-danger' : ''
              )}
            />
            {touched.message && errors.message && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.message}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant={'primary'} size={'sm'} rounded type="submit">
              Submit
            </Button>
            <Button variant={'danger'} size={'sm'} rounded type="reset">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ContactUs
