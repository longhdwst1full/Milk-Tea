import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useEffect, useState } from 'react'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { HiChartPie, HiClipboardCheck, HiCollection, HiShoppingBag, HiTicket } from 'react-icons/hi'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link to={'/staff/dashboard'}>Dashboard</Link>, '1', <HiChartPie />),

  getItem(<Link to={'/staff/products'}>Products</Link>, 'sub1', <HiShoppingBag />, [
    getItem(<Link to={'/staff/products'}>Product Management</Link>, '2'),
    getItem(<Link to={'/staff/addProduct'}>Add Product</Link>, '3')
  ]),

  getItem(<Link to={'/staff/categories'}>Category</Link>, 'sub2', <BiSolidCategoryAlt />, [
    getItem(<Link to={'/staff/categories'}>Category Management </Link>, '4'),
    getItem(<Link to={'/staff/addCategories'}>Add Category</Link>, '5')
  ]),

  getItem(<Link to={'/staff/orders'}>Order</Link>, '6', <HiClipboardCheck />),
  getItem(<Link to={'/staff/toppings'}>Toppings</Link>, '7', <HiCollection />),
  getItem(<Link to={'/staff/voucher'}>Voucher</Link>, '8', <HiTicket />)
]

const StaffSidebar = () => {
  // const isMdScreen = useMediaQuery('(min-width: 768px)')
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={`flex h-[32px] m-[16px] ${collapsed ? 'bg-none' : 'bg-[#002766]'} `}>
          {/* style={{ background: 'rgba(255, 255, 255, 0.2)' }} */}
          <img alt='' src='/logo_removebg.png' className='ml-2 h-6 sm:h-8' />
          <h3 className={`text-[#fff] font-bold py-1 px-[10%] ${collapsed ? 'hidden' : ''}`}>STAFF</h3>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
      </Sider>
    </>
  )
}

export default StaffSidebar
