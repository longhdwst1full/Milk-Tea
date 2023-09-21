import { Button } from '..'

const MyOrder = () => {
  return (
    <div className='layout-container w-full'>
      <h2 className='title text-2xl mb-5'>Đơn hàng của tôi</h2>
      <div className='max-h-[100vh] overflow-scroll hidden-scroll-bar '>
        <div className='order-content mb-20 '>
          <div className='status py-2'>
            <span className='mr-2'>Trạng thái: </span>
            <span className='uppercase text-[#D8B979]'>Đang giao</span>
          </div>
          <div className='top py-3 px-6 shadow rounded-md max-h-[250px] overflow-y-auto hidden-scroll-bar'>
            <div className='item flex items-center mb-5'>
              <div className='left flex pr-4 flex-1'>
                <div className='image w-[100px] h-[100px] shrink-0'>
                  <img
                    className='w-full object-cover'
                    src='https://tocotocotea.com/wp-content/uploads/2023/07/9501a1967827a879f136.jpg'
                    alt=''
                  />
                </div>
                <div className='title pl-3 flex flex-col'>
                  <h3
                    title=' Bàn làm việc gỗ, Bàn kệ lửng chân sắt dùng cho văn phòng, học bài, để máy tính cho học sinh, sinh viên
                    GIÁ XƯỞNG'
                    className='line-clamp-2 text-[16px] font-semibold uppercase '
                  >
                    Cà Phê Sữa Đá
                  </h3>
                  <div className='category'>
                    <span className='text-sm text-[#866312]'>Danh mục: Cà phê</span>
                  </div>
                  <div className='size'>
                    <span className='text-sm text-[#866312]'>Size: L</span>
                  </div>
                  <div className='quantity'>x1</div>
                </div>
              </div>
              <div className='right'>
                <div className='price ml-3 flex items-center'>
                  <span className='old-price line-through mr-1 text-black opacity-25 overflow-hidden'>₫90.000</span>
                  <span className='new-price text-[#D8B979] text-sm align-middle font-medium'>₫55.000</span>
                </div>
              </div>
            </div>
            <div className='item flex items-center mb-5'>
              <div className='left flex pr-4 flex-1'>
                <div className='image w-[100px] h-[100px] shrink-0'>
                  <img
                    className='w-full object-cover'
                    src='https://tocotocotea.com/wp-content/uploads/2023/07/9501a1967827a879f136.jpg'
                    alt=''
                  />
                </div>
                <div className='title pl-3 flex flex-col flex-1'>
                  <h3
                    title=' Bàn làm việc gỗ, Bàn kệ lửng chân sắt dùng cho văn phòng, học bài, để máy tính cho học sinh, sinh viên
                    GIÁ XƯỞNG'
                    className='line-clamp-2 text-[16px] font-semibold uppercase '
                  >
                    Cà Phê Sữa Đá
                  </h3>
                  <div className='category'>
                    <span className='text-sm text-[#866312]'>Danh mục: Cà phê</span>
                  </div>
                  <div className='size'>
                    <span className='text-sm text-[#866312]'>Size: XL</span>
                  </div>
                  <div className='quantity'>x1</div>
                </div>
              </div>
              <div className='right'>
                <div className='price ml-3 flex items-center'>
                  <span className='old-price line-through mr-1 text-black opacity-25 overflow-hidden'>₫90.000</span>
                  <span className='new-price text-[#D8B979] text-sm align-middle font-medium'>₫55.000</span>
                </div>
              </div>
            </div>
            <div className='item flex items-center mb-5'>
              <div className='left flex pr-4 flex-1'>
                <div className='image w-[100px] h-[100px] shrink-0'>
                  <img
                    className='w-full object-cover'
                    src='https://tocotocotea.com/wp-content/uploads/2023/07/9501a1967827a879f136.jpg'
                    alt=''
                  />
                </div>
                <div className='title pl-3 flex flex-col flex-1'>
                  <h3
                    title=' Bàn làm việc gỗ, Bàn kệ lửng chân sắt dùng cho văn phòng, học bài, để máy tính cho học sinh, sinh viên
                    GIÁ XƯỞNG'
                    className='line-clamp-2 text-[16px] font-semibold uppercase '
                  >
                    Cà Phê Sữa Đá
                  </h3>
                  <div className='category'>
                    <span className='text-sm text-[#866312]'>Danh mục: Cà phê</span>
                  </div>
                  <div className='size'>
                    <span className='text-sm text-[#866312]'>Size: XL</span>
                  </div>
                  <div className='quantity'>x1</div>
                </div>
              </div>
              <div className='right'>
                <div className='price ml-3 flex items-center'>
                  <span className='old-price line-through mr-1 text-black opacity-25 overflow-hidden'>₫90.000</span>
                  <span className='new-price text-[#D8B979] text-sm align-middle font-medium'>₫55.000</span>
                </div>
              </div>
            </div>
          </div>
          <div className='middle flex justify-end items-center my-1 py-2 px-6 shadow rounded-md'>
            <div className='total-price'>
              <span className='mr-[10px] text-sm text=black'>Thành tiền:</span>
              <span className='text-2xl text-[#D8B979]'>₫158.000</span>
            </div>
          </div>
          <div className='bottom flex items-center py-4 px-6 shadow rounded-md'>
            <div className='note flex-1 '>
              <span className='text-xs block w-[400px] max-w-[400px] text-left text-gray-500'>
                Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có
                vấn đề nào.
              </span>
            </div>
            <div className='confirm-button'>
              <Button onClick={() => alert('clicked')} size='medium' shape='round'>
                Đã nhận hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrder
