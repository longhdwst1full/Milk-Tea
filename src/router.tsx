import GuardAuth, { GuardAccount, GuardSign } from './guardRoute';
import { MyInfor, MyOrder, MyVoucher } from './components';

import AccountLayout from './layouts/AccountLayout/accountLayout';
import AdminLayout from './layouts/admin';
import Categories from './pages/admin/Categories/Categories';
import Checkout from './pages/Checkout/Checkout';
import ClientLayout from './layouts/client';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import HomePage from './pages/Home/HomePage';
import NotFound from './pages/Not-Found/NotFound';
import OrderDetail from './pages/admin/Order-Detail/OrderDetail';
import Orders from './pages/admin/Orders/Orders';
import ProductsList from './pages/admin/Products/Products';
import ProductsPage from './pages/Products/Products';
import Role from './pages/admin/Role/Role';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
import Topping from './pages/admin/Toppings/Topping';
import UserList from './pages/admin/Users/Users';
import Voucher from './pages/admin/Voucher/Voucher';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <GuardSign JSX={Signin} />,
  },
  {
    path: '/signup',
    element: <GuardSign JSX={Signup} />,
  },
  {
    path: '/products',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/account-layout',
    element: <GuardAccount JSX={AccountLayout} />,
    children: [
      {
        index: true,
        element: <MyInfor />,
      },
      {
        path: 'my-order',
        element: <MyOrder />,
      },
      {
        path: 'my-voucher',
        element: <MyVoucher />,
      },
    ],
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
            element: <Dashboard />,
          },
          {
            path: 'users',
            element: <UserList />,
          },
          {
            path: 'categories',
            element: <Categories />,
          },
          {
            path: 'products',
            element: <ProductsList />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'orders/:id',
            element: <OrderDetail />,
          },
          {
            path: 'toppings',
            element: <Topping />,
          },
          {
            path: 'role',
            element: <Role />,
          },
          {
            path: 'voucher',
            element: <Voucher />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
