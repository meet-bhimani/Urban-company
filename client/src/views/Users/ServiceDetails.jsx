import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getServiceById } from '../../api/serviceApi'
import HelmetHeader from '../../components/common/HelmetHeader'
import { MdKeyboardBackspace, MdLocalOffer, MdOutlineCurrencyRupee } from 'react-icons/md'
import { getServiceProviderById } from '../../api/usersApi'
import Button from '../../components/common/Button'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { IoIosWarning } from 'react-icons/io'

const ServiceDetails = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [serviceProvider, setServiceProvider] = useState(null)
  const { isAuth, user } = useSelector((state) => state.role)

  const navigate = useNavigate()

  const fetchService = async () => {
    try {
      const { success, data } = await getServiceById(id)
      if (success && data.length != 0) {
        setService(data)
        const { success: getServiceProviderSuccess, data: serviceProviderData } = await getServiceProviderById(
          data?.provider_id
        )
        if (getServiceProviderSuccess) {
          setServiceProvider(serviceProviderData)
        }
      } else if (data.length === 0) {
        navigate('/services')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleBooking = () => {
    if (!isAuth) {
      toast.error('Please Login to Book Service', {
        style: { backgroundColor: '#f58700', color: '#fff' },
        icon: <IoIosWarning />,
      })
    } else {
      navigate(`/services/${id}/confirm-booking`)
    }
  }

  useEffect(() => {
    if (isAuth && (user.role === 'admin' || user.role === 'service_provider')) navigate('/')
    fetchService()
  }, [id])

  return (
    <>
      <HelmetHeader
        title={`${service?.name ? service?.name : 'Service'} | Urban Company`}
        description={'explore professional services that experienced never before at your home with urban Company'}
      />
      <div className="w-[min(800px,90%)] mx-auto my-10 mb-16 px-4 relative">
        <div className="hidden lg:block absolute -left-14 top-3 p-1 rounded-full hover:bg-secondary duration-200 text-2xl">
          <NavLink to="/services">
            <MdKeyboardBackspace />
          </NavLink>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{service?.name}</h1>
            <div className="flex gap-1 items-center mt-2">
              <div className="w-[12px] md:w-[16px]">
                <img src="/images/star.png" alt="rating" className="w-full" />
              </div>
              <p className="text-xs sm:text-sm ">{service?.rating}</p>
              <p className="text-xs sm:text-sm ">
                (
                {service?.total_bookings.toString().length > 3
                  ? (service?.total_bookings / 1000).toFixed(2) + 'k '
                  : service?.total_bookings + ' '}
                Bookings)
              </p>
            </div>
            {service?.offer_text && (
              <div className="text-success mt-1 text-xs flex gap-1 items-center justify-start">
                <MdLocalOffer /> {service.offer_text}
              </div>
            )}
            <p className="text-xs md:text-sm lg:text-base mt-4">{service?.description}</p>
            {service?.features && (
              <div className="mt-4">
                <h2 className="text-base md:text-lg font-semibold mb-1">Services:</h2>
                <ul className="list-disc pl-4 md:pl-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-xs md:text-sm lg:text-base">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <h2 className="text-base md:text-lg font-semibold mb-1">Service Provider Details:</h2>
              <div className="pl-2 text-xs md:text-sm lg:text-base">
                <p>Brand Name: {serviceProvider?.brand_name}</p>
                <p>
                  Email:
                  <a href={`mailto:${serviceProvider?.email}`} className="text-primary">
                    {serviceProvider?.email}
                  </a>
                </p>
                <p>Expertise: {serviceProvider?.expertise.join(', ')}</p>
                <p>Ratings: {serviceProvider?.average_rating}/5</p>
                <p>
                  Location: {serviceProvider?.location?.address_line}, {serviceProvider?.location?.city},{' '}
                  {serviceProvider?.location?.state}
                </p>
                <span className="text-xs text-success">
                  (No charge for travel within {serviceProvider?.location?.city})
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-0 justify-start items-start md:gap-2 md:flex-row md:items-center">
              <p className="font-semibold text-base md:text-lg">Cost of Service:</p>
              <p className="text-xs md:text-sm flex gap-1 items-center">
                Starts from
                <span className="flex items-center">
                  <MdOutlineCurrencyRupee />
                  <span className="-ml-[2px]">{service?.cost}</span>
                </span>
              </p>
            </div>

            {service?.available ? (
              <div className="mt-4">
                <Button rounded onClick={handleBooking}>
                  Book Now
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2 justify-start items-start lg:flex-row lg:items-center">
                <Button rounded variant={'disabled'}>
                  Book Now
                </Button>
                <div className="text-danger text-xs md:text-sm">This service will be available soon</div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[min(300px,100%)]">
              <img src={service?.thumbnail} alt={service?.name} className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceDetails
