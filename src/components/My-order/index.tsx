import { useEffect, useState } from 'react'
import { Modal, Button as ButtonAnt, Radio, Popconfirm, Row } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Button } from '..'
import { ITopping } from '../../interfaces/topping.type'
import { useAppSelector } from '../../store/hooks'
import { OrderAPI, useCanceledOrderMutation } from '../../store/slices/order'
import { formatCurrency } from '../../utils/formatCurrency'
import './MyOrder.scss'
import { pause } from '../../utils/pause'
import { toast } from 'react-toastify'

enum STATUS_ORDER {
  ALL = 0,
  PENDING = 1,
  CONFIRMED = 2,
  DONE = 3,
  CANCELED = 4
}
const MyOrder = () => {
  const [seletedTab, setSelectedTab] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idOrder, setIdOrder] = useState('')
  const [reason, setReason] = useState('')

  const { user } = useAppSelector((state) => state.persistedReducer.auth)
  const [orderUser, setOrderUser] = useState<any>([])
  const tabs = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Hoàn thành', 'Đã hủy']
  const [getDataOrderUser] = OrderAPI.endpoints.getOrderUserByid.useLazyQuery()
  const [cancelOrder] = useCanceledOrderMutation()

  const reasonChange = (e: CheckboxChangeEvent) => {
    setReason(e.target.value)
  }
  const listReason: string[] = [
    'Không muốn mua sản phẩm này nữa.',
    'Sản phẩm bị hỏng khi nhận hàng.',
    'Sản phẩm không đúng mô tả trên trang web.',
    'Đã tìm thấy một sản phẩm tốt hơn ở nơi khác.',
    'Sản phẩm không còn cần thiết.',
    'Thay đổi ý định mua hàng.',
    'Gặp vấn đề tài chính không thể mua sản phẩm.',
    'Đặt hàng nhầm.',
    'Thời gian giao hàng quá chậm.'
  ]

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    await pause(2000)
    cancelOrder({ id: idOrder, reasonCancelOrder: reason })
      .unwrap()
      .then(() => {
        toast.success('Hủy đơn hàng thành công')
      })
      .catch(() => {
        toast.error('Hủy đơn hàng thất bại.')
      })
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setReason('')
    setIsModalOpen(false)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getDataOrderUser(user._id!)
      if (seletedTab === STATUS_ORDER.ALL) {
        setOrderUser(data?.docs)
      }
      if (seletedTab === STATUS_ORDER.PENDING) {
        setOrderUser(data?.docs.filter((item: any) => item.status === 'pending'))
      }
      if (seletedTab === STATUS_ORDER.CANCELED) {
        setOrderUser(data?.docs.filter((item: any) => item.status === 'canceled'))
      }
      if (seletedTab === STATUS_ORDER.DONE) {
        setOrderUser(data?.docs.filter((item: any) => item.status === 'done'))
      }
      if (seletedTab === STATUS_ORDER.CONFIRMED) {
        setOrderUser(data?.docs.filter((item: any) => item.status === 'confirmed'))
      }
    })()
  }, [seletedTab, isModalOpen])
  // console.log(orderUser)

  return (
    <div className='layout-container w-full'>
      <h2 className='title text-[#333] text-lg font-medium mb-5'>Đơn hàng của tôi</h2>
      <div className='tab-order mb-5 relative'>
        <ul className='flex w-full text-center shadow-lg '>
          {tabs.map((tab: string, index: number) => (
            <li
              key={index + tab}
              onClick={() => setSelectedTab(index)}
              className={`${
                seletedTab === index ? 'text-[#D8B979]' : ''
              } flex-1 cursor-pointer py-4 select-none border-b-4  hover:text-[#D8B979]`}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div
          className={`h-1 bg-[#D8B979] absolute bottom-0 left-[25%]`}
          style={{
            width: 100 / tabs.length + '%',
            transition: 'left 0.3s ease-in-out',
            left: seletedTab * (100 / tabs.length) + '%'
          }}
        ></div>
      </div>
      <div className='max-h-screen overflow-scroll hidden-scroll-bar '>
        {orderUser.length <= 0 ? (
          <div className='flex flex-col items-center justify-center w-full h-screen'>
            <img
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
              alt=''
              className='max-w-[150px]'
            />
            <h4 className='mt-2 text-lg'>Chưa có đơn hàng nào!</h4>
          </div>
        ) : (
          orderUser &&
          orderUser?.map((order: any) => (
            <div key={order._id} className={`order-content mb-20  shadow-md bg-[#fafafa]`}>
              <div className='status py-2'>
                <span className='ml-2'>Trạng thái: </span>
                <span className='uppercase text-[#D8B979]'>
                  {(order.status === 'pending' && 'Chờ xác nhận') ||
                    (order.status === 'confirmed' && 'Đã xác nhận') ||
                    (order.status === 'done' && 'Hoàn thành') ||
                    (order.status === 'canceled' && 'Đã hủy')}
                </span>
              </div>
              <div className='top py-3 px-6 shadow rounded-md max-h-[250px] overflow-y-auto hidden-scroll-bar'>
                {order.items.map((item: any) => (
                  <div key={item._id} className='item flex items-center mb-5'>
                    <div className='left flex pr-4 flex-1'>
                      <div className='image w-[100px] h-[100px] shrink-0'>
                        <img className='w-full object-cover' src={item.image} alt='' />
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
                        <div>
                          <div className='size'>
                            <span className='text-sm text-[#866312]'>Size: {item.size.name}</span>
                          </div>
                          <div className={`topping ${item.toppings.length > 0 ? '' : 'hidden'}`}>
                            <span className='text-sm text-[#866312]'>
                              Toppings: {item.toppings.map((topping: ITopping) => topping.name)}
                            </span>
                          </div>
                        </div>
                        <div className='quantity'>x{item.quantity}</div>
                      </div>
                    </div>
                    <div className='right'>
                      <div className='price ml-3 flex items-center'>
                        {/* <span className='old-price line-through mr-1 text-black opacity-25 overflow-hidden'>₫90.000</span> */}
                        <span className='new-price text-[#D8B979] text-sm align-middle font-medium'>
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='middle flex justify-end items-center my-1 py-2 px-6 shadow rounded-md'>
                <div className='total-price'>
                  <span className='mr-[10px] text-sm text=black'>Thành tiền:</span>
                  <span className='text-2xl text-[#D8B979]'>{formatCurrency(order.total)}</span>
                </div>
              </div>
              <div className='bottom flex items-center justify-end py-4 px-6 shadow rounded-md'>
                {order.status === 'canceled' && (
                  <div className='note flex-1 '>
                    <span className='text-sm block w-[400px] max-w-[400px] text-left text-gray-500 '>
                      <strong>Lý do hủy:</strong> {order?.reasonCancelOrder}
                    </span>
                  </div>
                )}
                <div className='confirm-button flex gap-x-3 items-center'>
                  <Button onClick={() => alert('clicked')} size='medium' shape='round'>
                    Chi tiết đơn hàng
                  </Button>
                  <Button
                    onClick={() => {
                      setIdOrder(order._id)
                      showModal()
                    }}
                    size='medium'
                    shape='round'
                    style={`${
                      (order.status === 'done' || order.status === 'confirmed' || order.status === 'canceled') &&
                      'hidden'
                    }`}
                  >
                    Hủy đơn hàng
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        title='Lý do hủy đơn hàng?'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <ButtonAnt hidden={!reason} key='cancel' onClick={handleCancel}>
            Hủy
          </ButtonAnt>,
          <Popconfirm
            title='Bạn chắc chắn muôn hủy đơn hàng này?'
            onConfirm={handleOk}
            okText='Chắc chắn'
            cancelText='Hủy'
            okButtonProps={{ style: { background: '#D34053' } }}
          >
            <ButtonAnt hidden={!reason} key='submit' className='bg-[#D34053] text-white hover:!text-white'>
              Xác nhận
            </ButtonAnt>
          </Popconfirm>
        ]}
      >
        <Row className='list-cancel-reason'>
          {listReason.map((reasonItem, index) => (
            <Radio.Group
              key={index + reasonItem}
              optionType='button'
              buttonStyle='solid'
              size='large'
              onChange={reasonChange}
              value={reason}
              className='w-full my-1'
            >
              <Radio value={reasonItem} className='select-none w-full text-center'>
                {reasonItem}
              </Radio>
            </Radio.Group>
          ))}
        </Row>
      </Modal>
    </div>
  )
}

export default MyOrder
