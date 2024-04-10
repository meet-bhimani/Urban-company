import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getAllServices } from '../../api/serviceApi'
import ServiceCard from '../../components/common/ServiceCard'
import HelmetHeader from '../../components/common/HelmetHeader'
import useGlobalSearch from '../../utils/custom-hooks/useGlobalSearch'
import SearchInput from '../../components/common/SearchInput'

const ServicesList = () => {
  const [services, setServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()

  const fieldsToSearch = useMemo(() => ['name', 'description', 'category', 'sub_category', 'features'], [])
  const { filteredData: filteredServices, searchQuery, setSearchQuery } = useGlobalSearch(services, fieldsToSearch)

  const getNonEmptyUniqueCategories = (uniqueCategories) => {
    return uniqueCategories.filter((category) => {
      return getServicesByCategory(category).length > 0
    })
  }

  const getServicesByCategory = (category) => {
    if (!filteredServices) return []
    return filteredServices.filter((service) => service.category === category)
  }

  const fetchServices = async () => {
    try {
      const { success, data } = await getAllServices()
      if (success) {
        setServices(data)
        setUniqueCategories([...new Set(data.map((service) => service.category))])
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
        <SearchInput
          dataName={'services'}
          className={'w-[min(400px,100%)] mx-auto'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {getNonEmptyUniqueCategories(uniqueCategories).length > 0 ? (
          getNonEmptyUniqueCategories(uniqueCategories).map((category) => {
            return (
              <div key={category} className="mt-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl">{category}</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {getServicesByCategory(category).map((service) => (
                    <ServiceCard service={service} key={service.id} />
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-base text-center mt-4">No services found matching your search</div>
        )}
      </div>
    </>
  )
}

export default ServicesList
