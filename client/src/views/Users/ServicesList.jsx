import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getAllServices } from '../../api/serviceApi'
import ServiceCard from '../../components/common/ServiceCard'
import HelmetHeader from '../../components/common/HelmetHeader'
import useGlobalSearch from '../../utils/custom-hooks/useGlobalSearch'
import SearchInput from '../../components/common/SearchInput'
import useFilter from '../../utils/custom-hooks/useFilter'
import { MdOutlineFilterAlt, MdOutlineFilterAltOff } from 'react-icons/md'
import Pagination from '../../components/common/Pagination'

const ServicesList = () => {
  const [services, setServices] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({ categories: [] })
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [page, setPage] = useState(1)
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()
  const filterDropdownRef = useRef(null)
  const [sortOrder, setSortOrder] = useState(null)

  const fieldsToSearch = useMemo(() => ['name', 'description', 'category', 'sub_category', 'features'], [])
  const { filteredData: searchData, searchQuery, setSearchQuery } = useGlobalSearch(services, fieldsToSearch)

  const { filteredData: filteredServices } = useFilter(searchData, filterCriteria)
  const itemsPerPage = 8
  const totalPage = Math.ceil(filteredServices.length / itemsPerPage)

  const handleCategorySelection = (category) => {
    setPage(1)
    if (category === 'all') {
      if (filterCriteria.categories.length === uniqueCategories.length) {
        setFilterCriteria({ categories: [] })
      } else {
        setFilterCriteria({ categories: uniqueCategories })
      }
    } else {
      setFilterCriteria((prevCriteria) => {
        const updatedCategories = prevCriteria.categories.includes(category)
          ? prevCriteria.categories.filter((cat) => cat !== category)
          : [...prevCriteria.categories, category]
        return { ...prevCriteria, categories: updatedCategories }
      })
    }
  }

  const handlePageChange = (value) => {
    if (value === ' ...') {
      setPage(totalPage)
    } else if (value === '... ') {
      setPage(1)
    } else if (value >= 1 && value <= totalPage) {
      setPage(value)
    }
  }

  const servicesToShow = () => {
    let sortedServices = [...filteredServices]

    if (sortOrder) {
      sortedServices.sort((a, b) =>
        sortOrder === 'asc' ? parseFloat(a.cost) - parseFloat(b.cost) : parseFloat(b.cost) - parseFloat(a.cost)
      )
    }

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, sortedServices.length)
    return sortedServices.slice(startIndex, endIndex)
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <HelmetHeader
        title={'Services | Urban Company'}
        description={'explore professional services that experienced never before at your home with urban Company'}
      />
      <div className="w-[85%] mx-auto mb-14 mt-8">
        <div className="flex gap-4 items-center justify-between">
          <SearchInput
            dataName={'services'}
            className={'w-[min(600px,100%)]'}
            value={searchQuery}
            onChange={(e) => {
              setPage(1), setSearchQuery(e.target.value)
            }}
          />
          <div className="mt-4 relative z-50" ref={filterDropdownRef}>
            <button className="cursor-pointer text-2xl" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
              {filterCriteria.categories.length > 0 ? (
                <MdOutlineFilterAltOff className="text-primary" />
              ) : (
                <MdOutlineFilterAlt className="text-primary" />
              )}
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full -mt-2 right-0 w-max bg-secondary border border-gray-200 py-1 px-3 rounded-md shadow-lg">
                <div className="py-1">
                  Filter by Category
                  <label className="pl-2 flex gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      value="all"
                      checked={filterCriteria.categories.length === uniqueCategories.length}
                      onChange={() => handleCategorySelection('all')}
                    />
                    All Categories
                  </label>
                  {uniqueCategories.map((category) => (
                    <label key={category} className="pl-2 flex gap-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        value={category}
                        checked={filterCriteria.categories.includes(category)}
                        onChange={() => handleCategorySelection(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
                <div className="flex flex-col items-start">
                  Sort by price:
                  <button className="text-base pl-2" onClick={() => setSortOrder('asc')}>
                    Low to High
                  </button>
                  <button className="text-base pl-2" onClick={() => setSortOrder('desc')}>
                    High to Low
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {servicesToShow()?.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {servicesToShow().map((service) => {
                return <ServiceCard service={service} key={service.id} />
              })}
            </div>
          ) : (
            <div className="text-base text-center mt-4">No services found matching your search</div>
          )}
        </div>
        {servicesToShow()?.length > 0 && <Pagination page={page} setPage={handlePageChange} totalPage={totalPage} />}
      </div>
    </>
  )
}

export default ServicesList
