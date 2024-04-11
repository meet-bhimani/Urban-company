import { useState, useEffect } from 'react'

const useCategoryFilter = (data, filterCriteria = {}) => {
  const [filteredData, setFilteredData] = useState([])

  const applyFilters = (dataToFilter) => {
    const filtered = dataToFilter.filter((item) => {
      const categoryFilter = filterCriteria.categories.length === 0 || filterCriteria.categories.includes(item.category)
      return categoryFilter
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

export default useCategoryFilter
