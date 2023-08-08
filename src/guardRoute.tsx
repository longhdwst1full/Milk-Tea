import AccountLayout from './layouts/AccountLayout/accountLayout';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';
import { Navigate } from 'react-router-dom';

interface Props {
  JSX: () => JSX.Element;
}

export const GuardNotUser = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);
  if (user.role?.name === 'admin' && user.role.status === 'active') {
    return <Navigate to={'/admin'} />;
  } else if (user.role?.name === 'customer') {
    return <Navigate to={'/'} />;
  }
  return <JSX />;
};

export const GuardExistUser = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);
  console.log(user);
  console.log(localStorage.getItem('LoginPassPort') as any);

  if (user.role?.name === 'admin' && user.role.status === 'active') {
    localStorage.removeItem('LoginPassPort');
    return <JSX />;
  } else if (user.role?.name === 'customer') {
    return <AccountLayout />;
  } else if (
    JSON.parse(localStorage.getItem('LoginPassPort') as any)?.role?.name === 'admin' &&
    JSON.parse(localStorage.getItem('LoginPassPort') as any)?.role?.status === 'active'
  ) {
    return <JSX />;
  }
  return <Navigate to={'/'} />;
};
