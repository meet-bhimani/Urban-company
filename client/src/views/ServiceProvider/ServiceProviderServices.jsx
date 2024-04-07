import React, { useEffect, useState } from 'react'
import HelmetHeader from '../../components/common/HelmetHeader'
import { useSelector } from 'react-redux'
import { getServiceProviderServices } from '../../api/serviceApi'
import ServiceCard from '../../components/common/ServiceCard'

const ServiceProviderServices = () => {
  const [serviceProviderServices, setServiceProviderServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const { isAuth, user: serviceProvider } = useSelector((state) => state.role)

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

  const getServicesByCategory = (category) => {
    return serviceProviderServices.filter((service) => service.category === category)
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
      <div className="w-[85%] mx-auto my-14">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center">My Services</h2>
        {uniqueCategories.map((category) => {
          return (
            <div key={category} className="mt-10">
              <h2 className="text-lg md:text-xl lg:text-2xl">{category}</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {getServicesByCategory(category).map((service) => (
                  <ServiceCard service={service} key={service.id} isServiceProvider={true} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ServiceProviderServices
