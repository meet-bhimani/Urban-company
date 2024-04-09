import React from 'react'
import { useParams } from 'react-router-dom'

const EditUser = () => {
  const { id: userId } = useParams()

  return <div>Edit user {userId}</div>
}

export default EditUser
