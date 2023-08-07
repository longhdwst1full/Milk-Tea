import PageNotFound from './pages/404/404';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

interface Props {
  JSX: () => JSX.Element;
}

export const GuardNotUser = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);

  return Object.keys(user).length <= 0 ? <JSX /> : <PageNotFound />;
};

export const GuardExistUser = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);

  return Object.keys(user).length <= 0 ? <PageNotFound /> : <JSX />;
};

// export default GuardRoute;
