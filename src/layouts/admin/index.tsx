import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import Navbar from '../../components/admin/Navbar'

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className='flex items-start pt-16'>
        <Sidebar />
        <main className='relative min-h-[100vh] w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout
