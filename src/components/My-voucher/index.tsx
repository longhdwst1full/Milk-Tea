import { Skeleton } from 'antd'
import { useGetAllVouchersQuery } from '../../api/voucher'
import { IVoucher } from '../../interfaces/voucher.type'

const MyVoucher = () => {
  const { data: vouchers, isLoading } = useGetAllVouchersQuery(0)
  // console.log(vouchers)
  return (
    <div>
      <h1 className='dark:text-white sm:text-2xl text-xl my-[10px] font-semibold text-gray-900'>Kho Mã Giảm Giá</h1>
      {isLoading ? (
        // <Loading />
        <Skeleton />
      ) : (
        <div className='list-voucher flex flex-wrap text-[14px]'>
          {vouchers &&
            vouchers?.data?.docs?.map((item: IVoucher) => {
              if (item.isActive) {
                const endDate = item?.endDate ? new Date(item?.endDate) : null
                const formattedEndDate = `${endDate?.getDate()}/${endDate?.getMonth()}/${endDate?.getFullYear()}`
                console.log(formattedEndDate)
                const sale = item?.sale / 1000
                return (
                  <div key={item?._id} className='voucher-item'>
                    <div className='text-[#08733B] text-justify'>
                      Voucher giảm {sale}k cho hóa đơn từ 100K - Chỉ áp dụng khi mua hàng trực tiếp tại cửa hàng.
                    </div>
                    <div className='voucher-code font-bold text-red-600'>{item?.code}</div>
                    <div className='voucher-expired-date text-[12px] text-[#08733B]'>
                      Ngày hết hạn: {formattedEndDate}
                    </div>
                  </div>
                )
              }
            })}
        </div>
      )}
    </div>
  )
}

export default MyVoucher
