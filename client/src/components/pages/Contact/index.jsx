import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role === 'admin') navigate('/')
  }, [])

  return <div>Contact page</div>
}

export default ContactUs
