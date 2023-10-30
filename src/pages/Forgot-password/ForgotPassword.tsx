import { Button, Input } from '../../components'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

const ForgotPassword = () => {
  return (
    <>
      <Loader />
      <div className='background-container'>
        <div className='flex items-center justify-center h-full'>
          <div className='content background-content bg-white w-[90vw] md:w-[500px] h-[600px] mx-6 md:px-[100px] py-6 flex justify-center items-center flex-col rounded'>
            <div className='logo'>
              <img src='/logo.png' alt='' className='w-[200px] mb-5' />
            </div>
            <form action='' className='flex flex-col w-full'>
              <Input type='auth' placeholder='Nhập số điện thoại của bạn ' name='account' />
              <Button type='auth' size='large' shape='circle'>
                Tiếp theo
              </Button>
              <div className='gap-x-2 flex items-center justify-center my-5 text-sm'>
                <div className=' font-semibold'>
                  <Link to='/signup' className='text-[#d4b774]'>
                    Tạo tài khoản
                  </Link>
                </div>
                <div className=' font-semibold'>
                  <Link to='/signin' className='text-[#d4b774] ml-5'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
            <div>
              <Link to='/' className='text-sm text-[#007bff] hover:underline'>
                Quay lại màn hình chính
              </Link>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  )
}

export default ForgotPassword
