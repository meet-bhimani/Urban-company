import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getAllServices } from '../../api/serviceApi'
import ServiceCard from '../../components/common/ServiceCard'
import HelmetHeader from '../../components/common/HelmetHeader'
import useGlobalSearch from '../../utils/custom-hooks/useGlobalSearch'
import SearchInput from '../../components/common/SearchInput'
import useCategoryFilter from '../../utils/custom-hooks/useCategoryFilter'

const ServicesList = () => {
  const [services, setServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({ categories: [] })
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()

  const fieldsToSearch = useMemo(() => ['name', 'description', 'category', 'sub_category', 'features'], [])
  const { filteredData: searchData, searchQuery, setSearchQuery } = useGlobalSearch(services, fieldsToSearch)
  const { filteredData: filteredServices } = useCategoryFilter(searchData, filterCriteria)

  const handleCategorySelection = (category, isChecked) => {
    if (category === 'all') {
      setFilterCriteria({ categories: isChecked ? uniqueCategories : [] })
    } else {
      setFilterCriteria((prevCriteria) => {
        const updatedCategories = isChecked
          ? [...prevCriteria.categories, category]
          : prevCriteria.categories.filter((cat) => cat !== category)
        return { ...prevCriteria, categories: updatedCategories }
      })
    }
  }

  const fetchServices = async () => {
    try {
      const { success, data } = await getAllServices()
      if (success) {
        setServices(data)
        const categories = [...new Set(data.map((service) => service.category))]
        setUniqueCategories(categories)
      }
    } catch (error) {
      console.error(error?.message)
    }
  }

  useEffect(() => {
    if (isAuth && (user.role === 'admin' || user.role === 'service_provider')) navigate('/')
    fetchServices()
  }, [])

  return (
    <>
      <HelmetHeader
        title={'Services | Urban Company'}
        description={'explore professional services that experienced never before at your home with urban Company'}
      />
      <div className="w-[85%] mx-auto mb-14 mt-8">
        <div>
          <SearchInput
            dataName={'services'}
            className={'w-[min(600px,100%)]'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <h3>Filter by:</h3>
          <div>
            <label>
              <input
                type="checkbox"
                value="all"
                checked={filterCriteria.categories.length === uniqueCategories.length}
                onChange={(e) => handleCategorySelection('all', e.target.checked)}
              />
              All Categories
            </label>
            {uniqueCategories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  value={category}
                  checked={filterCriteria.categories.includes(category)}
                  onChange={(e) => handleCategorySelection(category, e.target.checked)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredServices?.length > 0 ? (
            filteredServices.map((service) => {
              return <ServiceCard service={service} key={service.id} />
            })
          ) : (
            <div className="text-base text-center mt-4">No services found matching your search</div>
          )}
        </div>
      </div>
    </>
  )
}

export default ServicesList
