import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaPhoneAlt, FaStickyNote } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../components'
import { useAppSelector } from '../../store/hooks'

import { yupResolver } from '@hookform/resolvers/yup'
import { message } from 'antd'
import { useForm } from 'react-hook-form'
import { BiSolidUser } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { useStripePaymentMutation } from '../../api/paymentstripe'
import { useVnpayPaymentMutation } from '../../api/paymentvnpay'
import CheckoutItem from '../../components/Checkout-Item'
import ModalListVouchers from '../../components/ModalListVouchers'
import YaSuoMap from '../../components/map/YaSuoMap'
import YasuoGap from '../../components/map/YasuoGap'
import ListStore from '../../interfaces/Map.type'
import { IVoucher } from '../../interfaces/voucher.type'
import { ClientSocket } from '../../socket'
import { useCreateOrderMutation } from '../../store/slices/order'
import { arrTotal } from '../../store/slices/types/cart.type'
import { IOrderCheckout } from '../../store/slices/types/order.type'
import { formatCurrency } from '../../utils/formatCurrency'
import { UserCheckoutSchema } from '../../validate/Form'
import styles from './Checkout.module.scss'

//
const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [voucherChecked, setVoucherChecked] = useState({} as IVoucher)
  const [orderAPIFn, { isLoading: cod }] = useCreateOrderMutation()

  const [gapStore, setGapStore] = useState<ListStore[]>([])
  // const dispatch = useAppDispatch()
  const [OpenGapStore, setOpenGapStore] = useState(false)
  const [address, setAddress] = useState('') // Lấy value ở input địa chỉ người nhận;
  const [pickGapStore, setPickGapStore] = useState({} as ListStore)
  const [stripePayment, { isLoading: stripe }] = useStripePaymentMutation()
  const [vnpayPayment, { isLoading: vnpay }] = useVnpayPaymentMutation()
  // const [deleteCartDBFn] = useDeleteCartDBMutation()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleOpenGapStore = () => {
    setOpenGapStore(false)
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(UserCheckoutSchema)
  })

  const dataCartCheckout = useAppSelector((state) => state.persistedReducer.cart)
  const dataInfoUser = useAppSelector((state) => state.persistedReducer.auth)
  const textNoteOrderRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setValue('shippingLocation', address ?? '')
  }, [address, setValue])
  useEffect(() => {
    dataCartCheckout.items.length < 1 && navigate('/products')
  }, [dataCartCheckout.items, navigate])

  useEffect(() => {
    if (dataInfoUser.user) {
      dataInfoUser.user.username && setValue('name', dataInfoUser.user.username)
      dataInfoUser.user.address && setValue('shippingLocation', dataInfoUser.user.address)
    }
    // YaSuoMap();
  }, [dataInfoUser.user, dataInfoUser.user.address, dataInfoUser.user.username, setValue])

  const getData = useCallback(
    (getData: string) => {
      const arrTotal: arrTotal[] = []
      const arrTotalNumbers: number[] = []
      dataCartCheckout.items.map((item) =>
        item.items.map((data) => {
          if (getData == 'list') {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { total, _id, ...rest } = data
            arrTotal.push({ ...rest, name: item.name })
          } else {
            let value: number | undefined
            if (getData === 'quantity') {
              value = data.quantity
            } else if (getData === 'total') {
              value = data.total
            }

            if (value !== undefined) {
              arrTotalNumbers.push(value)
            }
          }
        })
      )
      return getData == 'list' ? arrTotal : arrTotalNumbers
    },
    [dataCartCheckout.items]
  )

  const totalQuantity = useMemo(() => {
    const all = getData('quantity') as number[]

    const a = all.reduce((acc, curent) => {
      return acc + curent
    }, 0)
    return a
  }, [getData])

  const moneyShipping = useMemo(() => {
    if (pickGapStore.value) {
      return pickGapStore.value > 30000 || pickGapStore.value <= 5000
        ? 0
        : Math.round(pickGapStore.value * 0.1 + totalQuantity * 0.005)
    }
    return 0
  }, [gapStore, pickGapStore])
  // total khuyen mai
  const moneyPromotion = useMemo(() => voucherChecked.sale ?? 0, [voucherChecked])

  // tong 1 san pham
  const totalMoneyCheckout = useMemo(() => {
    const all = getData('total') as number[]

    return all.reduce((acc: number, curent: number) => {
      const a = acc + curent
      return a
    }, 0)
  }, [getData])

  // tong cong tien
  const totalAllMoneyCheckOut = useMemo(() => {
    return moneyShipping + totalMoneyCheckout - moneyPromotion
  }, [moneyPromotion, moneyShipping, totalMoneyCheckout])

  const handleFormInfoCheckout = handleSubmit((data) => {
    if (Number(pickGapStore.value) > 30000) {
      message.error('Khoảng cách quá xa không thể giao hàng', 2)
    } else {
      const dataForm: IOrderCheckout = {
        user: dataInfoUser.user._id as string,
        items: getData('list'),
        total: totalAllMoneyCheckOut,
        priceShipping: moneyShipping,
        noteOrder: textNoteOrderRef.current?.value !== '' ? textNoteOrderRef.current?.value : ' ',
        paymentMethodId: data.paymentMethod,
        inforOrderShipping: {
          name: data.name,
          phone: data.phone,
          address: data.shippingLocation,
          noteShipping: data.shippingNote == '' ? ' ' : data.shippingNote
        }
      }

      const storeNote = {
        noteOrder: dataForm.noteOrder,
        noteShipping: dataForm.inforOrderShipping.noteShipping,
        paymentMethodId: dataForm.paymentMethodId
      }
      localStorage.setItem('storeNote', JSON.stringify(storeNote))

      if (data.paymentMethod == 'cod') {
        orderAPIFn(dataForm)
          .unwrap()
          .then((res) => {
            if (res.error) {
              return toast.error('Đặt hàng thất bại' + res.error.data.error)
            } else {
              // dispatch(resetAllCart())

              ClientSocket.sendNotificationToAdmin(
                `Đơn hàng "${res.order.orderNew._id.toUpperCase()}" vừa được tạo bởi khách hàng "${
                  res.order.orderNew.inforOrderShipping.name
                }" và đang chờ xác nhận.`
              )
              ClientSocket.createOrder(res.order.orderNew.user)
              window.location.href = res.order.url
            }
          })
      } else if (data.paymentMethod == 'stripe') {
        stripePayment(dataForm)
          .then(({ data: { url } }: any) => {
            window.location.href = url
          })
          .catch((err) => {
            console.error(err)
          })
      } else if (data.paymentMethod == 'vnpay') {
        vnpayPayment(dataForm)
          .unwrap()
          .then(({ url }) => {
            window.location.href = url
          })
          .catch((err) => {
            console.error(err)
          })
      }

      // orderAPIFn(dataForm)
      //   .unwrap()
      //   .then((res) => {
      //     if (res.error) {
      //       return toast.error('Đặt hàng thất bại' + res.error.data.error)
      //     } else {
      //       reset()
      //       dataCartCheckout.items.length &&
      //         dataCartCheckout.items.map((itemcart) => deleteCartDBFn(itemcart?._id as string))
      //       dispatch(resetAllCart())
      //       toast.success('Bạn đặt hàng thành công')

      //       // alert(data.shippingNote)=
      //       // dispatch(resetAllCart());
      //       // navigate('http://localhost:4000/vnpay');
      //       if (data.paymentMethod == 'vnpay') {
      //         const returnUrl = 'http://localhost:5173' // url trả về
      //         window.location.href =
      //           'http://ketquaday99.com/vnpay/fast?amount=' +
      //           dataForm.total +
      //           '&txt_inv_mobile=' +
      //           data.phone +
      //           '&txt_billing_fullname=' +
      //           data.name +
      //           '&txt_ship_addr1=' +
      //           data.shippingLocation +
      //           '&returnUrl=' +
      //           returnUrl
      //       }
      //     }
      //   })
    }
  })

  return (
    <div className='w-auto lg:w-[1200px] max-w-[1200px] my-0 mx-auto'>
      <div className='detail gap-y-10 lg:gap-y-0 lg:flex-row flex flex-col justify-between mt-6'>
        <form id='form_info_checkout' className='left w-full lg:w-[60%]'>
          <div className='title flex justify-between items-center px-5 mb-[7px] '>
            <div>
              <h2 className='text-sm font-bold'>Thông tin giao hàng</h2>
            </div>
          </div>
          <div className='content shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] p-5'>
            <div className='py-[10px]'>
              <Input
                name='name'
                register={register}
                error={errors.name?.message}
                prefix={<BiSolidUser />}
                placeholder='Tên người nhận'
              />
            </div>
            <div className='py-[10px]'>
              <Input
                prefix={<FaPhoneAlt />}
                placeholder='Số điện thoại người nhận'
                name='phone'
                register={register}
                error={errors.phone?.message}
              />
            </div>

            <div className='location'>
              <div className='title pt-[10px] text-sm'>
                <h2>Giao đến</h2>
              </div>
              <div>
                <div id='geocoder' className='flex flex-row gap-3'>
                  <i className='fa-solid fa-location-dot'></i>
                </div>
                {errors.shippingLocation && (
                  <span className='text-red-500 text-[13px] self-start'>Địa chỉ nhận hàng là bắt buộc</span>
                )}
              </div>
              {/* <Input
                  prefix={<FaMapMarkerAlt />}
                  placeholder='Địa chỉ người nhận'
                  name='address'
                  error={errors.shippingLocation?.message}
                  register={register}
                /> */}
              {/* </div> */}
            </div>
            <div className='py-[10px]'>
              <Input
                prefix={<FaStickyNote />}
                placeholder='Ghi chú địa chỉ...'
                name='shippingNote'
                error={errors.shippingNote?.message}
                register={register}
              />
            </div>
            <div>
              <YaSuoMap setGapStore={setGapStore} setAddress={setAddress} setPickGapStore={setPickGapStore} />
              <div id='map'></div>
            </div>
          </div>

          <div className=' mt-8'>
            <div className='title mb-[7px] px-5'>
              <h2 className='font-semibold text-sm'>Phương thức thanh toán</h2>
            </div>
            <div className='shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] bg-white p-5'>
              <label className={` ${styles.container_radio} cod-payment block group`}>
                <span className='text-sm'>Thanh toán khi nhận hàng</span>
                <input
                  className='absolute opacity-0'
                  defaultChecked
                  type='radio'
                  value='cod'
                  {...register('paymentMethod')}
                />
                <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
              </label>
              <label className={` ${styles.container_radio} cod-payment block group`}>
                <span className='text-sm'>Thanh toán qua Ví vnPay</span>
                <input
                  className='absolute opacity-0'
                  // defaultChecked
                  type='radio'
                  value='vnpay'
                  {...register('paymentMethod')}
                />
                <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
              </label>
              <label className={` ${styles.container_radio} cod-payment block group`}>
                <span className='text-sm'>Thanh toán qua Stripe</span>
                <input
                  className='absolute opacity-0'
                  // defaultChecked
                  type='radio'
                  value='stripe'
                  {...register('paymentMethod')}
                />
                <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
              </label>
              {/* <label className={` ${styles.container_radio} momo-payment block group`}>
                <span className='text-sm'>Thanh toán qua Ví MoMo</span>
                <input className='opacity-0 absolute' type='radio' value='momo' {...register('paymentMethod')} />
                <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
              </label> */}
              {errors.paymentMethod && <span className='text-red-500 text-[13px]'>{errors.paymentMethod.message}</span>}
            </div>
          </div>
        </form>
        <div className='right w-full lg:w-[40%] lg:pl-4'>
          <div className='title flex justify-between items-center px-5 mb-[7px] '>
            <div>
              <h2 className='text-sm font-bold'>Thông tin đơn hàng</h2>
            </div>
          </div>
          <div className='content shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] px-5 py-5'>
            <div className='list'>
              {dataCartCheckout.items &&
                dataCartCheckout.items.map((item) => <CheckoutItem key={uuidv4()} dataCartCheckout={item} />)}
              {/* <CheckoutItem /> */}
            </div>
            <div className='pt-[10px] pb-[15px] flex items-center justify-between border-transparent border border-b-[#f1f1f1]'>
              <div className='gap-x-4 flex items-center max-w-[50%]'>
                <img className='w-[24px] max-w-[24px]' src='/icon-promotion.png' alt='' />
                <span className='text-sm line-clamp-1'>
                  {Object.keys(voucherChecked).length > 0 ? voucherChecked.code : 'Mã khuyến mại'}
                </span>
              </div>
              <div className=''>
                <Button size='medium' shape='circle' onClick={toggleModal}>
                  Thêm khuyến mại
                </Button>
              </div>
            </div>
            <div className='py-[6px] border-transparent border border-b-[#f1f1f1]'>
              <div className=' flex items-center justify-between'>
                <div className='text-sm'>
                  <p>
                    Số lượng cốc: <span className='font-bold'>{totalQuantity}</span> cốc
                  </p>
                </div>
                <div className='flex items-center py-1 text-sm'>
                  <span>Tổng: </span>
                  <span className='font-bold w-[80px] text-right'>{formatCurrency(totalMoneyCheckout)}</span>
                </div>
              </div>
              <div className='flex justify-end py-1 text-sm'>
                <span>Quãng đường:</span>
                <span className='w-[80px] text-right'>{pickGapStore.text ? pickGapStore.text : '0 Km'}</span>
              </div>
              <div className='flex justify-end py-1 text-sm'>
                <span>Phí vận chuyển: </span>
                <span className='w-[80px] text-right'>{formatCurrency(moneyShipping)}</span>
              </div>
              <div className='flex justify-end py-1 text-sm'>
                <span>Khuyến mãi: </span>
                <span className='w-[80px] text-right'>{formatCurrency(moneyPromotion)}</span>
              </div>
              <div className='flex justify-end py-1 text-sm'>
                <span className='font-bold'>Tổng cộng: </span>
                <span className='w-[80px] text-right text-[#86744e] font-bold'>
                  {moneyPromotion >= totalAllMoneyCheckOut ? 0 : formatCurrency(totalAllMoneyCheckOut)}
                </span>
              </div>
            </div>
            <div className='note'>
              <textarea
                ref={textNoteOrderRef}
                placeholder='Thêm ghi chú...'
                className='w-full text-sm border-none outline-none'
              ></textarea>
            </div>
            <div className=''>
              <Button type='checkout' style={cod || stripe || vnpay ? 'bg-gray-500' : ''} size='large' shape='circle'>
                <span className='block' onClick={handleFormInfoCheckout}>
                  Đặt hàng
                </span>
              </Button>

              <Link to='/products'>
                <Button type='keep-buying' size='large' shape='circle'>
                  Tiếp tục mua hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <YasuoGap
        isOpen={OpenGapStore}
        gapStore={gapStore}
        setPickGapStore={setPickGapStore}
        toggleModal={toggleOpenGapStore}
      />
      <ModalListVouchers
        isOpen={isModalOpen}
        voucherChecked={voucherChecked}
        setVoucherChecked={setVoucherChecked}
        toggleModal={toggleModal}
      />
    </div>
  )
}

export default Checkout
