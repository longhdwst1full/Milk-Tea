import { type FC } from 'react';
import { Button, DarkThemeToggle, Navbar } from 'flowbite-react';
import { BiLogOut } from 'react-icons/bi';
import { useLogoutMutation } from '../../../api/Auth';

const AdminNavbar: FC = function () {
  const [logout] = useLogoutMutation();
  const onLogout = () => {
    logout();
  };
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/admin">
              <img alt="" src="/logo_removebg.png" className="mr-3 h-6 sm:h-8" />
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-green-400 text-xl font-bold" onClick={onLogout}>
              <BiLogOut />
            </Button>
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;
