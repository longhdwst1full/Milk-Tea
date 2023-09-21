import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import Navbar from '../../components/admin/Navbar'
import { useState } from 'react'

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <>
      <Navbar toggleSideBar={toggleSideBar} />
      <div className='flex items-start pt-16 w-screen'>
        <Sidebar isSideBarOpen={isSideBarOpen} />
        <main className='relative min-h-screen  w-full bg-gray-50 dark:bg-gray-900 ml-0 lg:ml-64 pt-4'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout
