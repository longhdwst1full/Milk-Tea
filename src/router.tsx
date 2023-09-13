import GuardAuth, { GuardAccount, GuardSign } from './guardRoute'
import { MyInfor, MyOrder, MyVoucher } from './components'

import AccountLayout from './layouts/AccountLayout/accountLayout'
import Achievement from './components/Achievement/Achievement'
import AdminLayout from './layouts/admin'
import BrandStory from './components/Blogs/BrandStory/BrandStory'
import Categories from './pages/admin/Categories/Categories'
import Checkout from './pages/Checkout/Checkout'
import ClientLayout from './layouts/client'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import Events from './components/Blogs/Events/Events'
import HomePage from './pages/Home/HomePage'
import Introduce from './components/Introduce/Introduce'
import LayoutBlog from './components/Blogs/Layout/LayoutBlog'
import List from './components/Staff/CrudProducts/List'
import MyAddress from './components/My-address'
import News from './components/Blogs/News/News'
import NotFound from './pages/Not-Found/NotFound'
import OrderDetail from './pages/admin/Order-Detail/OrderDetail'
import Orders from './pages/admin/Orders/Orders'
import ProductsList from './pages/admin/Products/Products'
import ProductsPage from './pages/Products/Products'
// import Role from './pages/admin/Manager-Staff-Shipper/Role'
import Signin from './pages/Sign-in/Signin'
import Signup from './pages/Sign-up/Signup'
import StaffLayout from './layouts/Staff/StaffLayout'
import Topping from './pages/admin/Toppings/Topping'
import UserList from './pages/admin/Users/Users'
import Voucher from './pages/admin/Voucher/Voucher'
import { createBrowserRouter } from 'react-router-dom'
import TrashCan from './pages/admin/Trash-can/TrashCan'
import SizeList from './pages/admin/Size/Size'
import Manager from './pages/admin/Manager-Staff-Shipper/Manager'
import Staff from './pages/admin/Manager-Staff-Shipper/Staff'
import Shipper from './pages/admin/Manager-Staff-Shipper/Shipper'
import Banner from './pages/admin/Banner/Banner'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signin',
    element: <GuardSign JSX={Signin} />
  },
  {
    path: '/signup',
    element: <GuardSign JSX={Signup} />
  },
  {
    path: '/products',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />
      },
      {
        path: 'checkout',
        element: <Checkout />
      }
    ]
  },
  {
    path: 'about',
    element: <Introduce />
  },
  {
    path: 'achievement',
    element: <Achievement />
  },
  {
    path: 'blogs',
    element: <LayoutBlog />,
    children: [
      {
        index: true,
        path: 'tin-tuc-khuyen-mai',
        element: <News />
      },
      {
        path: 'cau-chuyen-thuong-hieu',
        element: <BrandStory />
      },
      {
        path: 'su-kien',
        element: <Events />
      }
    ]
  },
  {
    path: '/account-layout',
    element: <GuardAccount JSX={AccountLayout} />,
    children: [
      { index: true, element: <MyInfor /> },
      { path: 'my-order', element: <MyOrder /> },
      { path: 'my-voucher', element: <MyVoucher /> },
      { path: 'my-address', element: <MyAddress /> }
    ]
  },
  {
    path: '/admin',
    element: <GuardAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'users',
            element: <UserList />
          },
          {
            path: 'categories',
            element: <Categories />
          },
          {
            path: 'products',
            element: <ProductsList />
          },
          {
            path: 'orders',
            element: <Orders />
          },
          {
            path: 'orders/:id',
            element: <OrderDetail />
          },
          {
            path: 'toppings',
            element: <Topping />
          },
          {
            path: 'manager',
            element: <Manager />,
            children: [
              {
                path: 'staff',
                element: <Staff />
              },
              {
                path: 'Shipper',
                element: <Shipper />
              }
            ]
          },
          {
            path: 'size',
            element: <SizeList />
          },
          {
            path: 'voucher',
            element: <Voucher />
          },
          {
            path: 'banners',
            element: <Banner />
          },
          {
            path: 'trash-can',
            element: <TrashCan />
          }
        ]
      }
    ]
  },
  {
    path: '/staff',
    element: <StaffLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'products',
        element: <List />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'orders/:id',
        element: <OrderDetail />
      },
      {
        path: 'toppings',
        element: <Topping />
      },
      {
        path: 'voucher',
        element: <Voucher />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default routes
