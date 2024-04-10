import React, { useEffect, useMemo, useState } from 'react'
import HelmetHeader from '../../components/common/HelmetHeader'
import { useSelector } from 'react-redux'
import { getServiceProviderServices } from '../../api/serviceApi'
import ServiceCard from '../../components/common/ServiceCard'
import SearchInput from '../../components/common/SearchInput'
import useGlobalSearch from '../../utils/custom-hooks/useGlobalSearch'

const ServiceProviderServices = () => {
  const [serviceProviderServices, setServiceProviderServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const { isAuth, user: serviceProvider } = useSelector((state) => state.role)

  const fieldsToSearch = useMemo(() => ['name', 'description', 'category', 'sub_category', 'features'], [])
  const {
    filteredData: filteredServices,
    searchQuery,
    setSearchQuery,
  } = useGlobalSearch(serviceProviderServices, fieldsToSearch)

  const getNonEmptyUniqueCategories = (uniqueCategories) => {
    return uniqueCategories.filter((category) => {
      return getServicesByCategory(category).length > 0
    })
  }

  const getServicesByCategory = (category) => {
    if (!filteredServices) return []
    return filteredServices.filter((service) => service.category === category)
  }

  const fetchServiceProviderServices = async () => {
    try {
      const { success, data } = await getServiceProviderServices(serviceProvider)
      if (success) {
        setServiceProviderServices(data)
        setUniqueCategories([...new Set(data.map((service) => service.category))])
      }
    } catch (error) {
      console.error(error?.message)
    }
  }

  useEffect(() => {
    fetchServiceProviderServices()
  }, [])

  return (
    <>
      <HelmetHeader
        title={'My Services | Urban Company'}
        description={'List all of your services, create new services and manage the services at your own'}
      />
      <div className="w-[80%] mx-auto mb-14 mt-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-4">My Services</h2>
        <SearchInput
          dataType={'service...'}
          className={'w-[min(400px,100%)] mx-auto'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {getNonEmptyUniqueCategories(uniqueCategories).length > 0 ? (
          getNonEmptyUniqueCategories(uniqueCategories).map((category) => {
            return (
              <div key={category} className="mt-8">
                <h2 className="text-lg md:text-xl lg:text-2xl">{category}</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {getServicesByCategory(category).map((service) => (
                    <ServiceCard service={service} key={service.id} isServiceProvider={true} />
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

export default ServiceProviderServices
