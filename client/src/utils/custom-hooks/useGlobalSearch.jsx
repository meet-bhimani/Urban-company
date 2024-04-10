import { useState, useEffect } from 'react'

const useGlobalSearch = (data, fieldsToSearch) => {
  const [filteredData, setFilteredData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const queryToSearch = searchQuery.toString().toLowerCase().trim()

    if (!queryToSearch) {
      setFilteredData(data)
      return
    }

    const filtered = data.filter((item) => {
      return fieldsToSearch.some((field) => String(item[field]).toLowerCase().includes(queryToSearch))
    })

    setFilteredData(filtered)
  }, [data, fieldsToSearch, searchQuery])

  return { filteredData, searchQuery, setSearchQuery }
}

export default useGlobalSearch
