import { Header } from '../../components';
import { Outlet } from 'react-router-dom';
type Props = {};

const ClientLayout = (props: Props) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ClientLayout;
