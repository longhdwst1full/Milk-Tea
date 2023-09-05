import { Sidebar, TextInput } from 'flowbite-react'
import type { FC } from 'react'
import { useState } from 'react'
import { HiChartPie, HiClipboardCheck, HiCollection, HiSearch, HiShoppingBag, HiUsers, HiTicket } from 'react-icons/hi'
import { BiSolidCategoryAlt, BiSolidUserCheck } from 'react-icons/bi'
import { MdOutlineWeb } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AdminSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState('')
  // const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleRedirect = (path: string) => {
    navigate(path)
    setCurrentPage(path)
  }
  // useEffect(() => {
  //   // const newPage = window.location.pathname;
  //   // console.log(pathname);
  //   setCurrentPage(pathname);
  // }, [currentPage]);

  return (
    <Sidebar aria-label='Sidebar with multi-level dropdown example' className='hidden lg:block'>
      <div className='flex flex-col justify-between h-full py-2'>
        <div>
          <form className='md:hidden pb-3'>
            <TextInput icon={HiSearch} type='search' placeholder='Search' required size={32} />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                // href="/admin"
                onClick={() => handleRedirect('/admin')}
                icon={HiChartPie}
                className={`cursor-pointer ${'/admin' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/products"
                onClick={() => handleRedirect('/admin/products')}
                icon={HiShoppingBag}
                className={`cursor-pointer ${'/admin/products' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                onClick={() => handleRedirect('/admin/categories')}
                icon={BiSolidCategoryAlt}
                className={`cursor-pointer ${
                  '/admin/categories' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''
                }`}
              >
                Categories
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/users"
                onClick={() => handleRedirect('/admin/users')}
                icon={HiUsers}
                className={`cursor-pointer ${'/admin/users' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Users list
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/orders')}
                icon={HiClipboardCheck}
                className={`cursor-pointer ${'/admin/orders' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Orders
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/toppings')}
                icon={HiCollection}
                className={`cursor-pointer ${'/admin/toppings' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Toppings
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/role')}
                icon={BiSolidUserCheck}
                className={`cursor-pointer ${'/admin/role' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Role
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/voucher')}
                icon={HiTicket}
                className={`cursor-pointer ${'/admin/voucher' === currentPage ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                Voucher
              </Sidebar.Item>
              {/* <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
            {/* <Sidebar.ItemGroup>
              <Sidebar.Item href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                Docs
              </Sidebar.Item>
              <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                Components
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/issues"
                icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup> */}
            <Sidebar.ItemGroup>
              <Sidebar.Item onClick={() => handleRedirect('/')} icon={MdOutlineWeb} className='cursor-pointer'>
                View Website
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  )
}

export default AdminSidebar
