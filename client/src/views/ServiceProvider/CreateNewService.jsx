import React, { useEffect, useState } from 'react'
import HelmetHeader from '../../components/common/HelmetHeader'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../components/common/Button'
import InputWithLabel from '../../components/common/InputWithLabel'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCategory, getCategories } from '../../api/categoriesApi'
import toast from 'react-hot-toast'
import { createNewService } from '../../api/serviceApi'
import { setRole } from '../../redux/actions/authAction'
import { twMerge } from 'tailwind-merge'

const CreateNewService = () => {
  const [categories, setCategories] = useState([])
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const { user } = useSelector((state) => state.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    service_provider_id: user.role === 'service_provider' ? user.id : '',
    name: '',
    description: '',
    thumbnail: '',
    category: '',
    sub_category: '',
    new_category: '',
    cost: '',
    features: '',
    offer_text: '',
  }

  const validationSchema = Yup.object({
    service_provider_id: Yup.string().required('Service provider id is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    thumbnail: Yup.string().required('Thumbnail is required'),
    category: Yup.string().required('Category is required'),
    sub_category: Yup.string(),
    cost: Yup.number().required('Cost is required').positive('Cost must be a positive number'),
    features: Yup.string().required('Features are required'),
    offer_text: Yup.string(),
  })

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setShowNewCategoryInput(selectedCategory === 'New')
    handleChange(e)
  }

  const handleNewCategorySubmit = async () => {
    try {
      const { success, data, error } = await createCategory(values.new_category)
      if (!success) throw new Error(error.message || 'Error creating category')
      setCategories((prevCategories) => [...prevCategories, data])
      setShowNewCategoryInput(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  const onSubmit = async (values) => {
    try {
      const { success, data, error } = await createNewService(values)
      if (!success) throw new Error(error.message || 'Error creating service')
      if (user.role === 'service_provider') dispatch(setRole(data))
      toast.success('Service created successfully')
      if (user.role === 'service_provider') {
        navigate('/my-services')
      } else {
        navigate('/manage-services')
      }
    } catch (error) {
      console.error(error.message)
      toast.error('Error creating service, try again')
    }
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const fetchCategories = async () => {
    try {
      const { success, data, error } = await getCategories()
      if (!success) throw new Error(error.message || 'Error fetching categories')
      setCategories(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      <HelmetHeader
        title={'Create Service | Urban Company'}
        description={'Create new service to target more of customers and grow your business with urban company'}
      />
      <div className="w-[min(600px,90%)] mx-auto my-10 mb-16">
        <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-6 text-center">Add New Service</h2>
        <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4 w-[min(90%,550px)]">
          <div>
            <InputWithLabel
              id="service_provider_id"
              name="service_provider_id"
              label="Service Provider ID"
              type="text"
              value={values.service_provider_id}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                (twMerge(
                  '',
                  touched.service_provider_id && errors.service_provider_id
                    ? 'focus-within:border-danger focus-within:ring-danger'
                    : ''
                ),
                user.role === 'service_provider' ? 'text-gray-400' : '')
              }
              disabled={user.role === 'service_provider'}
            />
            {touched.service_provider_id && errors.service_provider_id && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.service_provider_id}</p>
            )}
          </div>
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
              id="description"
              name="description"
              label="Description"
              type="text"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.description && errors.description ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
            />
            {touched.description && errors.description && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <InputWithLabel
              id="thumbnail"
              name="thumbnail"
              label="Thumbnail"
              type="text"
              value={values.thumbnail}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.thumbnail && errors.thumbnail ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
            />
            {touched.thumbnail && errors.thumbnail && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.thumbnail}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleCategoryChange}
                onBlur={handleBlur}
                className={`mt-1 text-xs block w-full rounded-md border-2 shadow-sm focus:border-primary focus:ring-0 px-3 py-2 outline-none ${
                  touched.category && errors.category ? 'border-danger' : ''
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
                <option value="New">Add New Category</option>
              </select>
              {touched.category && errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="sub_category" className="block text-sm text-gray-700">
                Sub Category
              </label>
              <select
                id="sub_category"
                name="sub_category"
                value={values.sub_category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 text-xs block w-full rounded-md border-2 shadow-sm focus:border-primary focus:ring-0 px-3 py-2 outline-none ${
                  touched.sub_category && errors.sub_category ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select a sub-category</option>
                {categories
                  .find((category) => category.name === values.category)
                  ?.sub_categories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.name}>
                      {subCategory.name}
                    </option>
                  ))}
              </select>
              {touched.sub_category && errors.sub_category && (
                <p className="text-red-500 text-xs mt-1">{errors.sub_category}</p>
              )}
            </div>
          </div>

          {showNewCategoryInput && (
            <div>
              <InputWithLabel
                id="new_category"
                name="new_category"
                label="New Category"
                type="text"
                value={values.new_category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`my-2 block w-full rounded-md border shadow-sm focus:border-primary focus:ring-0 outline-none ${
                  touched.new_category && errors.new_category ? 'border-danger' : ''
                }`}
              />
              {touched.new_category && errors.new_category && (
                <p className="text-red-500 text-xs mt-1">{errors.new_category}</p>
              )}
              <Button variant="primary" rounded onClick={handleNewCategorySubmit}>
                Add
              </Button>
            </div>
          )}

          <div>
            <InputWithLabel
              id="cost"
              name="cost"
              label="Cost"
              type="number"
              value={values.cost}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.cost && errors.cost ? 'focus-within:border-danger focus-within:ring-danger' : ''}
            />
            {touched.cost && errors.cost && <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.cost}</p>}
          </div>

          <div>
            <InputWithLabel
              id="features"
              name="features"
              label="Features"
              type="text"
              value={values.features}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.features && errors.features ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
            />
            {touched.features && errors.features && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.features}</p>
            )}
          </div>

          <div>
            <InputWithLabel
              id="offer_text"
              name="offer_text"
              label="Offer Text"
              type="text"
              value={values.offer_text}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.offer_text && errors.offer_text ? 'focus-within:border-danger focus-within:ring-danger' : ''
              }
            />
            {touched.offer_text && errors.offer_text && (
              <p className="text-danger ml-1 text-xs xsm:text-sm">{errors.offer_text}</p>
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
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateNewService
