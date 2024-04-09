import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getAllServices } from '../../api/serviceApi'
import ServiceCard from '../../components/common/ServiceCard'
import HelmetHeader from '../../components/common/HelmetHeader'

const ServicesList = () => {
  const [services, setServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()

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

  const getServicesByCategory = (category) => {
    return services.filter((service) => service.category === category)
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
      <div className="w-[85%] mx-auto my-14">
        {uniqueCategories.map((category) => {
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
        })}
      </div>
    </>
  )
}

export default ServicesList
