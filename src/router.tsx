import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
import ProductsPage from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import AccountLayout from './layouts/AccountLayout/accountLayout';
import { MyInfor, MyOrder, MyVoucher } from './components';
import ClientLayout from './layouts/client';
import AdminLayout from './layouts/admin';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import UserList from './pages/admin/Users/Users';
import Categories from './pages/admin/Categories/Categories';
import ProductsList from './pages/admin/Products/Products';
import Topping from './pages/admin/Toppings/Topping';
import Sizes from './pages/admin/Sizes/Sizes';
import PageNotFound from './pages/404/404';
import Role from './pages/admin/Role/Role';
import Voucher from './pages/admin/Voucher/Voucher';
import NotFound from './pages/Not-Found/NotFound';
import Orders from './pages/admin/Orders/Orders';
import OrderDetail from './pages/admin/Order-Detail/OrderDetail';
import { GuardExistUser, GuardNotUser } from './guardRoute';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <GuardNotUser JSX={Signin} />,
  },
  {
    path: '/signup',
    element: <GuardNotUser JSX={Signup} />,
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
    element: <GuardExistUser JSX={AccountLayout} />,
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
        path: 'sizes',
        element: <Sizes />,
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
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
