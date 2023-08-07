import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const { user } = useSelector((state: RootState) => state.persistedReducer.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // if (Object.keys(user).length > 0 && user.role?.name !== 'admin') navigate('/');
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex items-start pt-16">
        <Sidebar />
        <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
