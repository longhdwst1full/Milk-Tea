import { MyInfor, MyOrder, MyVoucher } from './components'
import { GuardAccount, GuardSign } from './guardRoute'

import Achievement from './components/Achievement/Achievement'
import BrandStory from './components/Blogs/BrandStory/BrandStory'
import Events from './components/Blogs/Events/Events'
import LayoutBlog from './components/Blogs/Layout/LayoutBlog'
import News from './components/Blogs/News/News'
import Introduce from './components/Introduce/Introduce'
import MyAddress from './components/My-address'
import AccountLayout from './layouts/AccountLayout/accountLayout'
import ClientLayout from './layouts/client'
import Checkout from './pages/Checkout/Checkout'
import HomePage from './pages/Home/HomePage'
import NotFound from './pages/Not-Found/NotFound'
import ProductsPage from './pages/Products/Products'
import { createBrowserRouter } from 'react-router-dom'
import Signin from './pages/Sign-in/Signin'
import Signup from './pages/Sign-up/Signup'
import ForgotPassword from './pages/Forgot-password/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword'
import PaymentResult from './pages/PaymentResult/PaymentResult'

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
    path: '/forgot-password',
    element: <ForgotPassword />
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
      },
      {
        path: 'checkout/payment-result',
        element: <PaymentResult />
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
      { path: 'my-address', element: <MyAddress /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'my-order/:id', element: 'My order detail' }
    ]
  },
  //update
  {
    path: '*',
    element: <NotFound />
  }
])

export default routes
