import { NavLink } from 'react-router-dom'
import { scrollToTop } from '../../../../utils/functions/scrollToTop'
import { useSidebarContext } from '../../../../context/sideBarContext'

const SidebarLinks = ({ Links = [] }) => {
  const { showSidebar, setShowSidebar } = useSidebarContext()
  return (
    <>
      {Links.map((link) => {
        return (
          <li
            key={link.label}
            className={`flex items-center justify-center py-2 font-medium rounded-md cursor-pointer`}
          >
            <NavLink
              to={link.slug}
              onClick={() => {
                scrollToTop(), setShowSidebar(false)
              }}
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-gray-300' : ''
                } relative outline-none text-black hover:bg-gray-300 flex items-center h-[40px] gap-1 text-[1rem] p-0.5 xsm:p-1.5 rounded transition-all duration-300 ease-in-out group`
              }
            >
              <div className="flex items-center px-1">
                {link?.icon}
                <span
                  className={`overflow-hidden transition-all line-clamp-1 ${showSidebar ? 'w-[180px] ml-2' : 'w-0'}`}
                >
                  {link?.label}
                </span>
              </div>
              {!showSidebar && (
                <div
                  className={`absolute left-full w-max rounded-md px-2 py-1 ml-3 bg-gray-300 text-black text-sm invisible opacity-20 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                  {link?.label}
                </div>
              )}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}

export default SidebarLinks
