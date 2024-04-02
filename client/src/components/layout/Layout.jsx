import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Sidebar from './Navbar/Sidebar/Sidebar'
import { useSidebarContext } from '../../context/sideBarContext'

const Layout = () => {
  const { showSidebar } = useSidebarContext()
  return (
    <>
      <div className="flex h-screen">
        <div className={`fixed md:relative h-svh bg-secondary ${showSidebar ? 'w-[250px]' : 'w-[60px]'} duration-300`}>
          <Sidebar />
        </div>

        <div className={`flex flex-col flex-grow px-4 md:ml-0 ml-[60px]`}>
          <Navbar />

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
