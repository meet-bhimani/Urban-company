import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getServiceById } from '../../api/serviceApi'

const Service = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const navigate = useNavigate()

  const fetchService = async () => {
    try {
      const { success, data } = await getServiceById(id)
      if (success && data.length != 0) {
        setService(data)
      } else if (data.length === 0) {
        navigate('/services')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchService()
  }, [id])

  return <>{<div>Service {id}</div>}</>
}

export default Service
