import { Modal, Row, Radio, Empty, message, Button } from 'antd'
import { useGetVoucherUnexpriedQuery } from '../../api/voucher'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { IVoucher } from '../../interfaces/voucher.type'
import isExpiredVoucher from '../../utils/isExpiredVoucher'
import { GiTicket } from 'react-icons/gi'
import { formatCurrency } from '../../utils/formatCurrency'
// import { useState } from 'react'
import './ModalListVoucher.scss'

type ModalListVouchersProps = {
  isOpen: boolean
  voucherChecked: IVoucher
  setVoucherChecked: React.Dispatch<React.SetStateAction<IVoucher>>
  toggleModal: () => void
}

const ModalListVouchers = ({ isOpen, toggleModal, voucherChecked, setVoucherChecked }: ModalListVouchersProps) => {
  const { data: vouchers } = useGetVoucherUnexpriedQuery()

  const onChange = (e: CheckboxChangeEvent) => {
    setVoucherChecked(e.target.value)
    message.success('Thêm mã thành công🎉', 0.5)
  }

  const onCancel = () => {
    toggleModal()
    // setVoucherChecked({} as IVoucher)
    // if (Object.keys(voucherChecked).length > 0) {
    //   message.error('Đã bỏ chọn mã khuyến mại', 1)
    // }
  }

  const cancelVoucher = () => {
    setVoucherChecked({} as IVoucher)
    if (Object.keys(voucherChecked).length > 0) {
      message.error('Đã bỏ chọn mã khuyến mại', 1)
    }
  }
  return (
    <Modal
      title='Mã khuyến mại hôm nay 😍'
      destroyOnClose={true}
      open={isOpen}
      onOk={toggleModal}
      // style={{ top: 0 }}
      onCancel={onCancel}
      centered
      width={660}
      footer={
        vouchers &&
        vouchers?.data?.docs.length > 0 && [
          <Button hidden={Object.keys(voucherChecked).length > 0 ? false : true} key='submit' onClick={cancelVoucher}>
            Hủy
          </Button>,
          <Button
            hidden={Object.keys(voucherChecked).length > 0 ? false : true}
            key='submit'
            className='bg-[#EE4D2D] text-white hover:!text-white'
            onClick={toggleModal}
          >
            Áp dụng
          </Button>
        ]
      }
    >
      <Row className='list-voucher flex items-center justify-center md:justify-start gap-3 max-h-[450px] overflow-y-auto hidden-scroll-bar'>
        {vouchers && vouchers?.data?.docs.length > 0 ? (
          vouchers?.data?.docs?.map((voucher) => (
            <Radio.Group
              key={voucher._id}
              optionType='button'
              buttonStyle='solid'
              size='large'
              onChange={onChange}
              value={voucherChecked}
              className='my-2 '
            >
              <Radio className='select-none' disabled={isExpiredVoucher(voucher?.endDate as string)} value={voucher}>
                <div className='flex flex-col text-center items-center justify-center'>
                  <GiTicket className='text-2xl' />
                  <span>Mã: {voucher.code}</span>
                  <span> Giảm: {formatCurrency(voucher.sale)}</span>
                </div>
              </Radio>
            </Radio.Group>
          ))
        ) : (
          <div className='flex items-center justify-center w-full py-4'>
            <Empty
              className='flex items-center flex-col'
              image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              imageStyle={{ height: 200 }}
              description={<span>Rất tiếc hiện tại không có mã khuyến mại nào 😥</span>}
            />
          </div>
        )}
      </Row>
    </Modal>
  )
}

export default ModalListVouchers
