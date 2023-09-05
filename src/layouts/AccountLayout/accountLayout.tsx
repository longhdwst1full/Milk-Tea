import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AiFillHome, AiOutlineUser, AiFillCreditCard } from 'react-icons/ai'
import { GrLogout } from 'react-icons/gr'
import { MdShoppingCart } from 'react-icons/md'
import { Header } from '../../components'
import { useLogoutMutation } from '../../api/Auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const AccountLayout = () => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
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
            navigate('/', { replace: true, relative: 'path' })
            toast.success('Đăng xuất thành công')
          })
          .catch(() => toast.error('Đăng xuất thất bại'))
      }
    })
  }
  return (
    <>
      <Header />
      <div className='container mx-auto p-[20px] flex'>
        <div className='list-sidebar w-[250px] max-w-[250px] mr-[20px] flex-shrink-0'>
          <div className='menu text-[14px]'>
            <div className='menu-item flex items-center border border-transparent border-b-[#f1f1f1] p-[15px] cu'>
              <AiFillHome className='text-[14px] mr-2 ' />
              <Link to='/'>Trang chủ</Link>
            </div>

            <div className='menu-item flex items-center border border-transparent border-b-[#f1f1f1] p-[15px]'>
              <AiOutlineUser className='text-[14px] mr-2 ' />
              <Link to='/account-layout'>Thông tin tài khoản</Link>
            </div>

            <div className='menu-item flex items-center border border-transparent border-b-[#f1f1f1] p-[15px]'>
              <MdShoppingCart className='text-[14px] mr-2 ' />
              <Link to='my-order'>Đơn hàng của tôi</Link>
            </div>

            <div className='menu-item flex items-center border border-transparent border-b-[#f1f1f1] p-[15px]'>
              <AiFillCreditCard className='text-[14px] mr-2 ' />
              <Link to='my-voucher'>Mã khuyến mại</Link>
            </div>

            <div className='menu-item flex items-center border border-transparent border-b-[#f1f1f1] p-[15px]'>
              <GrLogout className='text-[14px] mr-2 ' />
              <p onClick={onLogout} className='cursor-pointer'>
                Đăng xuất
              </p>
            </div>
          </div>
        </div>
        <Outlet />
        {/* <div className="my-account grow ">
        <div className="account flex flex-col">
          <div className="bg-top-account"></div>

          <div className="account-content relative -top-5 bg-[#fff] mx-4 rounded-md">
            <div className="account-avatar absolute -top-[60px] left-[calc(50%-60px)] h-[120px] w-[120px] bg-[#fff] rounded-full border-[5px] border-white">
              <div className="avatar ">
                <div>
                  <img className="" src="/logo_icon.png" />
                </div>
                <div className="image-upload">
                  <label className="btn-change-photo" htmlFor="file-input"></label>
                  <input className="hidden" id="file-input" type="file" />
                </div>
              </div>
            </div>

            <div className="profile mt-[90px] px-[20px] text-sm">
              <form action="">
                <div className="flex flex-wrap">
                  <div className="item-profile w-[50%] my-3 ">
                    <label className="block py-2 text-[#959393] ">Mã thành viên</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3 ">
                    <label className="block py-2 text-[#959393]">Điểm</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Họ và tên</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Sinh nhật</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Số điện thoại</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Email</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Giới tính</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Địa chỉ mặc định</label>
                    <input
                      className="g-gray-50 focus:outline-none w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                      type="text"
                    />
                  </div>
                </div>
                <div className='my-5 text-center'>
                  <button
                    className="btn bg-[#d8b979] text-white rounded-xl w-[calc(50%-30px)] uppercase cursor-pointer h-[36px]"
                    type="submit"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  )
}

export default AccountLayout
