import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'
import SidebarLinks from './SidebarLinks'
import { adminLinks, publicLinks, serviceProviderLinks, userLinks } from './LinkData'
import { useSidebarContext } from '../../../../context/sideBarContext'
import { PiSignOutBold } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { removeRole } from '../../../../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../../../common/Button'
import { MdClose } from 'react-icons/md'

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useSidebarContext()
  const { isAuth, user } = useSelector((state) => state.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(removeRole())
    toast.success('logout successfully')
    navigate('/login')
  }

  let linksToShow = publicLinks

  if (isAuth) {
    switch (user.role) {
      case 'user':
        linksToShow = userLinks
        break
      case 'service_provider':
        linksToShow = serviceProviderLinks
        break
      case 'admin':
        linksToShow = adminLinks
        break
      default:
        linksToShow = publicLinks
    }
  }

  return (
    <>
      <nav className="h-full flex flex-col bg-secondary border-r shadow-sm">
        <div className={`py-4 px-3 pb-0 flex items-center ${showSidebar ? 'justify-between' : 'justify-center'}`}>
          {showSidebar && (
            <img
              src="/images/favicon.png"
              className={`overflow-hidden transition-all ${showSidebar ? 'w-8' : 'w-0'}`}
              alt=""
            />
          )}
          <button
            onClick={() => setShowSidebar((curr) => !curr)}
            className="p-1 cursor-pointer rounded-lg hover:bg-white hidden sm:block"
          >
            {showSidebar ? <LuChevronFirst /> : <LuChevronLast />}
          </button>
          <MdClose className="sm:hidden" onClick={() => setShowSidebar((prev) => !prev)} />
        </div>

        <ul className="flex-1 px-1 mt-5">
          <SidebarLinks Links={linksToShow} />
        </ul>

        {isAuth && (
          <div className="mb-4 text-xl text-center">
            {showSidebar ? (
              <Button variant={'dark-outline'} rounded classNames="w-[80%] border-2">
                Logout
              </Button>
            ) : (
              <button
                onClick={handleLogout}
                className="relative group hover:bg-gray-300 rounded transition p-0.5 xsm:p-1.5"
              >
                <PiSignOutBold />
                <div
                  className={`absolute top-1 left-full w-max rounded-md px-2 py-1 ml-3 bg-gray-300 text-black text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                  Logout
                </div>
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default Sidebar
