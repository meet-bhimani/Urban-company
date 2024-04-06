import { NavLink } from 'react-router-dom'
import Button from '../../common/Button'
import { useSelector } from 'react-redux'
import { useSidebarContext } from '../../../context/sideBarContext'
import { MdOutlineMenu } from 'react-icons/md'

const TopNavbar = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const { setShowSidebar } = useSidebarContext()

  return (
    <>
      <div className="flex items-center justify-between w-full px-2 py-0 min-h-[4rem] bg-secondary">
        <div>
          <NavLink to="/">
            <img src="/images/logo.png" alt="Logo" width="130" height="130" />
          </NavLink>
        </div>
        <div className="flex gap-2 items-center">
          {isAuth ? (
            /* logo and name for loggedIn user  */
            <div className="relative group">
              <span className="inline-block h-8 w-8 mr-0 sm:mr-4 rounded-full bg-gray-300 text-center leading-8 text-gray-700 cursor-pointer font-semibold transition-all">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
              <div className="absolute w-max top-1/2 -translate-y-1/2 right-3/4 group-hover:right-full mr-1 bg-black text-white px-2 py-1 text-xs rounded invisible group-hover:visible transition-all">
                {user?.name}
              </div>
            </div>
          ) : (
            <ul className="flex gap-4 items-center mr-4">
              <li>
                <NavLink to="/login" className="text-gray-700 hover:text-gray-900">
                  <Button variant={'primary-outline'} rounded size="md">
                    Login
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="text-gray-700 hover:text-gray-900">
                  <Button variant={'primary-outline'} rounded size="md">
                    SignUp
                  </Button>
                </NavLink>
              </li>
            </ul>
          )}
          <MdOutlineMenu
            onClick={() => setShowSidebar((prev) => !prev)}
            className="text-xl mr-3 cursor-pointer sm:hidden"
          />
        </div>
      </div>
    </>
  )
}

export default TopNavbar
