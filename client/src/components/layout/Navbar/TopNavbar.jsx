import { NavLink } from 'react-router-dom'
import Button from '../../common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSidebarContext } from '../../../context/sideBarContext'
import { MdOutlineMenu } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import { removeRole } from '../../../redux/actions/authAction'
import toast from 'react-hot-toast'

const TopNavbar = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const { setShowSidebar } = useSidebarContext()
  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  const handleLogout = () => {
    dispatch(removeRole())
    toast.success('logout successfully')
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
            <div className="relative group" ref={dropdownRef}>
              <span
                className="inline-block h-8 w-8 mr-0 sm:mr-4 rounded-full bg-gray-300 text-center leading-8 text-gray-700 cursor-pointer font-semibold transition-all"
                onClick={toggleDropdown}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </span>
              <div className="absolute w-max top-1/2 -translate-y-1/2 right-3/4 group-hover:right-full mr-1 bg-black text-white px-2 py-1 text-xs rounded invisible group-hover:visible transition-all">
                {user?.name}
              </div>
              {showDropdown && (
                <div className="absolute top-full mt-1 right-5 bg-white shadow-lg rounded w-40 py-1 z-10 hidden md:block">
                  {user.role != 'admin' && (
                    <NavLink
                      to={user.role === 'user' ? '/user-profile' : 'my-profile'}
                      className="block px-3 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      My Profile
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
