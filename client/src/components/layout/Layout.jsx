import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Sidebar from './Navbar/Sidebar/Sidebar'
import { useSidebarContext } from '../../context/sideBarContext'
import TopNavbar from './Navbar/TopNavbar'
import { twMerge } from 'tailwind-merge'
import ChatSupport from '../common/ChatSupport'

const Layout = () => {
  const { showSidebar } = useSidebarContext()
  return (
    <>
      <div className="flex h-svh">
        <div
          className={twMerge(
            'z-10 fixed right-0 sm:left-0 top-0 h-full bg-secondary invisible sm:visible duration-300',
            showSidebar ? 'w-[250px] visible' : 'w-[40px] xsm:w-[60px]'
          )}
        >
          <Sidebar />
        </div>

        <div
          className={`duration-300 flex flex-col flex-grow sm:ml-[60px] ${
            showSidebar ? 'lg:ml-[250px]' : 'lg:ml-[60px]'
          }`}
        >
          <TopNavbar />

          <div className="flex-grow">
            <Outlet />
          </div>

          <Footer />
        </div>

        <div className="fixed bottom-[15px] right-[25px] w-8">
          <ChatSupport />
        </div>
      </div>
    </>
  )
}

export default Layout
