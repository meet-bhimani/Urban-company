import { useSelector } from 'react-redux'
import HelmetHeader from '../../components/common/HelmetHeader'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getCategories, getSubCategories } from '../../api/categoriesApi'
import Button from '../../components/common/Button'
import { FaLongArrowAltRight } from 'react-icons/fa'
import dummySubCategories from '../../utils/data/dummySubCategories'

const Home = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)
  const [subCategories, setSubCategories] = useState(null)

  const fetchCategories = async () => {
    try {
      const { success, data } = await getCategories()
      if (success) {
        setCategories(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchSubCategories = async () => {
    try {
      const { success, data } = await getSubCategories()
      if (success) {
        setSubCategories(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      user.role === 'service_provider'
        ? navigate('/my-services')
        : user.role === 'admin'
        ? navigate('/manage-users')
        : ''
    }
    fetchCategories()
    fetchSubCategories()
  }, [isAuth])

  return (
    <>
      <HelmetHeader title={'Urban Company'} description={'Urban Company - Get expert professional services at home'} />
      <div className="w-[85%] mx-auto">
        <div className="my-10 w-full min-h-[80svh] grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="py-6 px-2 flex flex-col justify-center items-center lg:items-start gap-6">
            <h1 className="text-2xl sm:text-3xl">Home services at your doorstep</h1>
            <div className="relative border-2 border-secondary p-4 rounded-lg w-full md:w-[80%] pb-20 bg-gradient-to-b from-transparent to-secondary from-80%">
              <p className="text-sm lg:text-lg mb-4">What are you looking for?</p>
              <div className="">
                {dummySubCategories && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 gap-x-6">
                    {dummySubCategories.map((category) => {
                      return (
                        <NavLink to={`/services`} key={category.id} className="p-2 grid">
                          <div className="bg-[#f5f5f5] w-[50px] h-[50px] rounded-lg justify-self-center grid place-items-center">
                            {category?.thumbnail && <img src={category?.thumbnail} className="w-[90%] rounded-lg" />}
                          </div>
                          <p className="text-center mt-2 text-xs xsm:text-sm md:text-sm">{category.name}</p>
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </div>
              <Button variant="dark" rounded classNames="absolute bottom-[3%] left-1/2 -translate-x-1/2">
                <NavLink to={'/services'} className="flex items-center justify-center gap-1">
                  Explore <FaLongArrowAltRight />
                </NavLink>
              </Button>
            </div>
          </div>
          <div className="grid place-items-center">
            <img src="/images/bg2.png" alt="Urban Company Services" width="500" height="500" className="w-full" />
          </div>
        </div>

        <div className="my-16 sm:my-24 w-[min(800px,95%)] mx-auto">
          <img
            src="/images/bg1.png"
            alt="Services at home like never experienced before"
            width="600px"
            className="w-full"
          />
        </div>

        {/* <div>
          {categories &&
            categories.map((category) => (
              <div key={category.id}>
                <h3>{category.name}</h3>
              </div>
            ))}
        </div> */}
      </div>
    </>
  )
}

export default Home
