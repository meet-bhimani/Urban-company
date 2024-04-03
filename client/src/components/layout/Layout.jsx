import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Sidebar from './Navbar/Sidebar/Sidebar'
import { useSidebarContext } from '../../context/sideBarContext'
import TopNavbar from './Navbar/TopNavbar'

const Layout = () => {
  const { showSidebar } = useSidebarContext()
  return (
    <>
      <div className="flex h-screen">
        <div
          className={`z-10 fixed lg:relative h-svh bg-secondary ${
            showSidebar ? 'w-[250px]' : 'w-[40px] xsm:w-[60px]'
          } duration-300`}
        >
          <Sidebar />
        </div>

        <div className={`flex flex-col flex-grow lg:ml-0 ml-[40px] xsm:ml-[60px]`}>
          <TopNavbar />

          <div className="flex-grow">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
