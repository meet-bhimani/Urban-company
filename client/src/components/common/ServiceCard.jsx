import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import { MdOutlineCurrencyRupee } from 'react-icons/md'

const ServiceCard = ({ service }) => {
  return (
    <>
      <div className="border-2 border-secondary p-4 rounded-md min-h-[300px] flex flex-col shadow">
        <div className="w-[min(250px,100%)] h-[200px] mx-auto">
          <img
            src={service?.thumbnail}
            className="w-full h-full object-cover rounded-lg hover:scale-110 duration-200"
          />
        </div>
        <div className="px-2 flex flex-col min-h-[250px]">
          <h3 className="text-base md:text-lg mt-3">{service?.name}</h3>
          <div className="flex gap-1 items-center mt-2">
            <div className="w-[12px] md:w-[16px]">
              <img src="/images/star.png" alt="rating" className="w-full" />
            </div>
            <p className="text-xs sm:text-sm ">{service?.rating}</p>
            <p className="text-xs sm:text-sm ">({service?.total_reviews} reviews)</p>
          </div>
          <p className="text-xs sm:text-sm mt-2 flex gap-1 items-center">
            Starts at
            <span className="font-semibold flex items-center">
              <MdOutlineCurrencyRupee />
              <span className="-ml-[2px]">{service?.cost}</span>
            </span>
          </p>
          <hr className="border-b-[1.5px] border-primary border-opacity-20 border-dashed my-4" />
          <div className="w-[90%] mx-auto">
            <ul>
              {service?.features &&
                service?.features.slice(0, 2).map((feature) => {
                  return (
                    <li key={feature} className="list-disc text-xs">
                      <span className="line-clamp-2">{feature}</span>
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className="mt-auto">
            <NavLink to={`/services/${service.id}`}>
              <Button variant={'primary'} size="sm" rounded>
                View Details
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceCard
