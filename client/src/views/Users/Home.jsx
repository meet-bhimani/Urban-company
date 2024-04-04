import { useSelector } from 'react-redux'
import HelmetHeader from '../../components/common/HelmetHeader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      user.role === 'service_provider'
        ? navigate('/service-provider-dashboard')
        : user.role === 'admin'
        ? navigate('/admin-dashboard')
        : ''
    }
  }, [isAuth])

  return (
    <>
      <HelmetHeader title={'Urban Company'} description={'Urban Company - Get expert professional services at home'} />
      <h1 className="text-3xl">Home</h1>
    </>
  )
}

export default Home
