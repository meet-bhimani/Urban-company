import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'
import SidebarLinks from './SidebarLinks'
import { publicLinks } from './LinkData'
import { useSidebarContext } from '../../../../context/sideBarContext'

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useSidebarContext()
  return (
    <>
      <nav className="h-full flex flex-col bg-secondary border-r shadow-sm">
        <div className={`py-4 px-3 pb-2 flex items-center ${showSidebar ? 'justify-between' : 'justify-center'}`}>
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
      </nav>
    </>
  )
}

export default Sidebar
