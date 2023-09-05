import { type FC } from 'react'
import { Button, DarkThemeToggle, Navbar, Avatar } from 'flowbite-react'
import { BiLogOut } from 'react-icons/bi'
import { useLogoutMutation } from '../../../api/Auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
// import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useAppSelector } from '../../../store/hooks'
const AdminNavbar: FC = function () {
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
              <img alt='' src='/logo_removebg.png' className='mr-3 h-6 sm:h-8' />
            </Navbar.Brand>
          </div>
          <div className='flex items-center gap-3'>
            <Button className='bg-green-400 text-xl font-bold' onClick={onLogout}>
              <BiLogOut />
            </Button>
            <DarkThemeToggle accessKey='' about='' />
            <Avatar img={user.avatar} rounded status='online' bordered color={'success'} statusPosition='top-right' />
          </div>
        </div>
      </div>
    </Navbar>
  )
}

export default AdminNavbar
