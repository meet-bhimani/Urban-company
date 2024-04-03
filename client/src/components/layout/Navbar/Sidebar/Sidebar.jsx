import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'
import SidebarLinks from './SidebarLinks'
import { publicLinks } from './LinkData'
import { useSidebarContext } from '../../../../context/sideBarContext'
import { PiSignOutBold } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { removeRole } from '../../../../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useSidebarContext()
  const { isAuth, user } = useSelector((state) => state.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(removeRole())
    alert('logout success')
    navigate('/login')
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
          <button onClick={() => setShowSidebar((curr) => !curr)} className="p-1 rounded-lg hover:bg-white">
            {showSidebar ? <LuChevronFirst /> : <LuChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-1 mt-5">
          <SidebarLinks Links={publicLinks} />
        </ul>

        {isAuth && (
          <div className="mb-4 grid place-items-center text-xl">
            <button onClick={handleLogout}>
              <PiSignOutBold />
            </button>
          </div>
        )}
      </nav>
    </>
  )
}

export default Sidebar
