import { DarkThemeToggle, Navbar, Avatar, Dropdown } from 'flowbite-react'
import { BiLogOut } from 'react-icons/bi'
import { useLogoutMutation } from '../../../api/Auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
// import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useAppSelector } from '../../../store/hooks'
import { FaBell } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'

type AdminNavbarProps = {
  toggleSideBar: () => void
}
const AdminNavbar = function ({ toggleSideBar }: AdminNavbarProps) {
  const [logout] = useLogoutMutation()
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const onLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Bạn thực sự muốn đăng xuất?',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .unwrap()
          .then(() => {
            toast.success('Đăng xuất thành công')
          })
          .catch(() => toast.error('Đăng xuất thất bại'))
      }
    })
  }

  return (
    <Navbar fluid>
      <div className='w-full p-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Navbar.Brand href='/admin'>
              <img alt='' src='/logo_removebg.png' className='mr-3 md:h-6 h-10' />
            </Navbar.Brand>
            <div className='block lg:hidden cursor-pointer' onClick={toggleSideBar}>
              <AiOutlineMenu className='dark:text-white text-2xl text-black' />
            </div>
          </div>
          <div className='flex items-center gap-y-3 gap-x-4'>
            <DarkThemeToggle accessKey='' about='' />
            <Dropdown label={<FaBell className='text-lg' />} inline size='lg'>
              <Dropdown.Header>
                <h4 className='font-semibold text-xl'>Thông báo</h4>
              </Dropdown.Header>
              <Dropdown.Item>Đăng xuất</Dropdown.Item>
              <Dropdown.Item>Đăng xuất Đăng xuất</Dropdown.Item>
              <Dropdown.Item>Đăng xuất</Dropdown.Item>
              <Dropdown.Item>Đăng xuất</Dropdown.Item>
            </Dropdown>
            <Dropdown
              inline
              label={
                <Avatar
                  img={user.avatar}
                  rounded
                  status='online'
                  bordered
                  color={'success'}
                  statusPosition='top-right'
                />
              }
            >
              <Dropdown.Header>
                <div className='flex items-center gap-x-3'>
                  <Avatar img={user.avatar} rounded />
                  <div className='flex flex-col'>
                    <span className='block text-sm'>{user.username}</span>
                    <span className='block truncate text-sm font-medium'>{user.account}</span>
                  </div>
                </div>
              </Dropdown.Header>
              <Dropdown.Item icon={BiLogOut} onClick={onLogout}>
                Đăng xuất
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </Navbar>
  )
}

export default AdminNavbar
