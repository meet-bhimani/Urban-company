import React, { useEffect, useState } from 'react'
import { getAllServices } from '../../api/serviceApi'
import { NavLink } from 'react-router-dom'

const ServicesList = () => {
  const [services, setServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])

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
    fetchServices()
  }, [])

  return (
    <>
      <div className="w-[85%] mx-auto my-14">
        {uniqueCategories.map((category) => {
          return (
            <div key={category} className="mt-10">
              <h2 className="text-lg md:text-2xl lg:text-3xl">{category}</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getServicesByCategory(category).map((service) => (
                  <NavLink key={service.id} to={`/services/${service.id}`}>
                    <div className="border border-secondary p-4 rounded-md">
                      <h3 className="text-sm md:text-lg">{service.name}</h3>
                      <p className="text-xs sm:text-sm">{service.description}</p>
                      <p className="text-xs sm:text-sm">Cost: ${service.cost}</p>
                    </div>
                  </NavLink>
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
