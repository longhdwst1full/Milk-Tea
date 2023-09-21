import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiChartPie, HiClipboardCheck, HiCollection, HiShoppingBag, HiUsers, HiTicket } from 'react-icons/hi'
import { BiSolidCategoryAlt, BiSolidUserCheck } from 'react-icons/bi'
import { MdOutlineWeb } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaTrashArrowUp } from 'react-icons/fa6'
import { FaImages, FaNewspaper } from 'react-icons/fa'
import { AiFillSetting, AiOutlineFontSize } from 'react-icons/ai'

type AdminSidebarProps = {
  isSideBarOpen?: boolean
}
const AdminSidebar = function ({ isSideBarOpen }: AdminSidebarProps) {
  const [currentPage, setCurrentPage] = useState('')
  const { pathname } = useLocation()

  const navigate = useNavigate()
  const handleRedirect = (path: string) => {
    navigate(path)
  }
  useEffect(() => {
    setCurrentPage(pathname)
  }, [pathname])

  return (
    <Sidebar
      aria-label='Sidebar with multi-level dropdown example'
      className={`fixed transition-all duration-500 ease-in-out translate-x-[-100%] lg:block lg:translate-x-0 ${
        isSideBarOpen ? 'translate-x-0' : 'translate-x-[-100%]'
      } lg:translate-x-0 `}
    >
      <div className='flex flex-col justify-between h-full py-2 '>
        <div>
          {/* <form className='md:hidden pb-3'>
            <TextInput icon={HiSearch} type='search' placeholder='Search' required size={32} />
          </form> */}
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                // href="/admin"
                onClick={() => handleRedirect('/admin')}
                icon={HiChartPie}
                className={`cursor-pointer ${'/admin' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''}`}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Collapse label='Management' icon={BiSolidUserCheck}>
                <Sidebar.Item
                  // href="/admin/products"
                  onClick={() => handleRedirect('/admin/manage/products')}
                  icon={HiShoppingBag}
                  className={`cursor-pointer ${
                    '/admin/manage/products' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                  }`}
                >
                  Products
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => handleRedirect('/admin/manage/size')}
                  icon={AiOutlineFontSize}
                  className={`cursor-pointer ${
                    '/admin/manage/size' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                  }`}
                >
                  Sizes
                </Sidebar.Item>
                <Sidebar.Item
                  // href="/admin/orders"
                  onClick={() => handleRedirect('/admin/manage/toppings')}
                  icon={HiCollection}
                  className={`cursor-pointer ${
                    '/admin/manage/toppings' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                  }`}
                >
                  Toppings
                </Sidebar.Item>
                {/* <Sidebar.Item
                  // href="/admin/orders"
                  onClick={() => handleRedirect('/admin/manager/staff')}
                  icon={BiSolidUserCheck}
                  className={`cursor-pointer ${
                    '/admin/manager/staff' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                  }`}
                >
                  Staff
                </Sidebar.Item>
                <Sidebar.Item
                  // href="/admin/orders"
                  onClick={() => handleRedirect('/admin/manager/shipper')}
                  icon={BiSolidUserCheck}
                  className={`cursor-pointer ${
                    '/admin/manager/shipper' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                  }`}
                >
                  Shipper
                </Sidebar.Item> */}
              </Sidebar.Collapse>
              <Sidebar.Item
                onClick={() => handleRedirect('/admin/categories')}
                icon={BiSolidCategoryAlt}
                className={`cursor-pointer ${
                  '/admin/categories' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                }`}
              >
                Categories
              </Sidebar.Item>

              <Sidebar.Item
                // href="/admin/users"
                onClick={() => handleRedirect('/admin/users')}
                icon={HiUsers}
                className={`cursor-pointer ${'/admin/users' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''}`}
              >
                Users list
              </Sidebar.Item>
              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/orders')}
                icon={HiClipboardCheck}
                className={`cursor-pointer ${'/admin/orders' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''}`}
              >
                Orders
              </Sidebar.Item>

              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/voucher')}
                icon={HiTicket}
                className={`cursor-pointer ${'/admin/voucher' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''}`}
              >
                Voucher
              </Sidebar.Item>
              <Sidebar.Collapse icon={AiFillSetting} label='Settings'>
                <Sidebar.Item
                  // href="/admin/orders"
                  onClick={() => handleRedirect('/admin/banners')}
                  icon={FaImages}
                  className={`cursor-pointer ${
                    '/admin/banners' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                  }`}
                >
                  Banners
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item
                // href="/admin/orders"
                onClick={() => handleRedirect('/admin/news')}
                icon={FaNewspaper}
                className={`cursor-pointer ${'/admin/news' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''}`}
              >
                News
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
              <Sidebar.Item
                onClick={() => handleRedirect('/admin/trash-can')}
                icon={FaTrashArrowUp}
                className={`cursor-pointer ${
                  '/admin/trash-can' === currentPage ? 'bg-gray-300 dark:bg-[#2563EB]' : ''
                }`}
              >
                Trash Can
              </Sidebar.Item>
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
