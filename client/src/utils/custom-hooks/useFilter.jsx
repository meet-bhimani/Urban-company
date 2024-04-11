import { useState, useEffect } from 'react'

const useFilter = (data, filterCriteria = {}) => {
  const [filteredData, setFilteredData] = useState([])

  const applyFilters = (dataToFilter) => {
    const filtered = dataToFilter.filter((item) => {
      const categoryFilter = filterCriteria.categories
        ? filterCriteria.categories.length === 0 || filterCriteria.categories.includes(item.category)
        : false
      const statusFilter = filterCriteria.status
        ? filterCriteria.status === 'all'
          ? true
          : item.status === filterCriteria.status
        : false
      return categoryFilter || statusFilter
    })
    setFilteredData(filtered)
  }

  useEffect(() => {
    if (data) {
      applyFilters(data)
    } else {
      setFilteredData([])
    }
  }, [data, filterCriteria])

  return { filteredData }
}

export default useFilter
