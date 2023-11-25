import { AiFillMail, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Button, Checkbox, Label, Table, TextInput, Tooltip } from 'flowbite-react'
import { HiCog, HiDocumentDownload, HiDotsVertical, HiExclamationCircle, HiPhone, HiTrash } from 'react-icons/hi'
import { FaArrowLeftLong } from 'react-icons/fa6'
import {
  useCanceledOrderMutation,
  useConfirmOrderMutation,
  useDeliveredOrderMutation,
  useDoneOrderMutation,
  useGetOrderByidQuery
} from '../../../store/slices/order'

import { IOrderDetailResponse } from '../../../interfaces/order.type'
import Loading from '../../../components/Loading'
import { formatCurrency } from '../../../utils/formatCurrency'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { ITopping } from '../../../interfaces/topping.type'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: orderDetail, isLoading } = useGetOrderByidQuery(id as string)
  const [confirmOrder, { isError: isConfirmErr, isLoading: isConfirming }] = useConfirmOrderMutation()
  const [doneOrder, { isError: isDoneErr, isLoading: isDoning }] = useDoneOrderMutation()
  const [deliveredOrder, { isError: isDeliveredErr, isLoading: isDelivering }] = useDeliveredOrderMutation()
  const [canceledOrder, { isError: isCancelErr, isLoading: isCanceling }] = useCanceledOrderMutation()

  const handleSetConfirmStatus = () => {
    if (id) {
      confirmOrder(id).then(() => {
        if (!isConfirmErr) {
          toast.success('Change status success')
        } else {
          toast.error('Change status failed')
        }
      })
    }
  }

  const handleSetDoneStatus = () => {
    if (id) {
      doneOrder(id).then(() => {
        if (!isDoneErr) {
          toast.success('Change status success')
        } else {
          toast.error('Change status failed')
        }
      })
    }
  }

  const handleSetDeliveredStatus = () => {
    if (id) {
      deliveredOrder(id).then(() => {
        if (!isDeliveredErr) {
          toast.success('Change status success')
        } else {
          toast.error('Change status failed')
        }
      })
    }
  }

  const handleSetCanceledStatus = () => {
    if (id) {
      const textReason = prompt('Làm ơn điền lý do hủy đơn hàng')
      console.log(textReason)
      if (id && textReason != '' && textReason) {
        canceledOrder({ id, reasonCancelOrder: textReason }).then(() => {
          if (!isCancelErr) {
            toast.success('Change status success')
          } else {
            toast.error('Change status failed')
          }
        })
      }
    }
  }
  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4 flex items-center gap-x-4'>
            <div className='cursor-pointer p-3 dark:text-white' onClick={() => navigate(-1)}>
              <Tooltip content='Back'>
                <FaArrowLeftLong />
              </Tooltip>
            </div>

            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900 select-none'>
              Order Detail
            </h1>
          </div>
          <div className='sm:flex'>
            <div className='dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 items-center hidden mb-3'>
              <form className='lg:pr-3'>
                <Label htmlFor='users-search' className='sr-only'>
                  Search
                </Label>
                <div className='lg:w-64 xl:w-96 relative mt-1'>
                  <TextInput id='users-search' name='users-search' placeholder='Search for users' />
                </div>
              </form>
              <div className='sm:mt-0 sm:pl-2 flex pl-0 mt-3 space-x-1'>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Configure</span>
                  <HiCog className='text-2xl' />
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Delete</span>
                  <HiTrash className='text-2xl' />
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Purge</span>
                  <HiExclamationCircle className='text-2xl' />
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Settings</span>
                  <HiDotsVertical className='text-2xl' />
                </a>
              </div>
            </div>
            <div className='sm:space-x-3 flex items-center ml-auto space-x-2'>
              <Button
                disabled={
                  orderDetail?.order.status === 'canceled' ||
                  orderDetail?.order.status === 'delivered' ||
                  orderDetail?.order.status === 'confirmed' ||
                  orderDetail?.order.status === 'done'
                }
                color='primary'
                onClick={handleSetConfirmStatus}
              >
                {isConfirming ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : 'Confirm'}
              </Button>
              <Button
                color='warning'
                disabled={
                  orderDetail?.order.status === 'canceled' ||
                  orderDetail?.order.status === 'pending' ||
                  orderDetail?.order.status === 'delivered' ||
                  orderDetail?.order.status === 'done'
                }
                onClick={handleSetDeliveredStatus}
              >
                {isDelivering ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : ' Delivery'}
              </Button>
              <Button
                disabled={
                  orderDetail?.order.status === 'confirmed' ||
                  orderDetail?.order.status === 'delivered' ||
                  orderDetail?.order.status === 'done'
                }
                color='failure'
                onClick={handleSetCanceledStatus}
              >
                {isCanceling ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : 'Canceled'}
              </Button>
              <Button
                disabled={
                  orderDetail?.order.status === 'canceled' ||
                  orderDetail?.order.status === 'pending' ||
                  orderDetail?.order.status === 'confirmed'
                }
                color='success'
                onClick={handleSetDoneStatus}
              >
                {isDoning ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : 'Done'}
              </Button>
              <Button color='gray'>
                <div className='gap-x-3 flex items-center'>
                  <HiDocumentDownload className='text-xl' />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <OrderDetailTable orderDetail={orderDetail as IOrderDetailResponse} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type OrderDetailTableProps = {
  orderDetail: IOrderDetailResponse
  isLoading: boolean
}
const OrderDetailTable = ({ orderDetail, isLoading }: OrderDetailTableProps) => {
  if (isLoading) return <Loading />
  return (
    <>
      <div className='dark:bg-gray-800 md:items-start md:p-6 xl:p-8  flex flex-col items-center justify-between w-full px-4 py-6 bg-gray-200'>
        <h3 className='dark:text-white text-xl font-semibold leading-5 text-gray-800'>Customer</h3>
        <div className='md:space-x-6 lg:space-x-8  flex items-stretch justify-start w-full h-full'>
          <div className='flex flex-col items-start justify-start flex-1 flex-shrink-0'>
            <div className='md:justify-start flex items-center justify-center w-full py-8 space-x-4 border-b border-gray-200'>
              <img src={orderDetail?.order && orderDetail?.order.user.avatar} alt='avatar' className='w-32' />
              <div className='flex flex-col items-start justify-start space-y-2'>
                <p className='dark:text-white text-base font-semibold leading-4 text-left text-gray-800'>
                  {orderDetail?.order && orderDetail.order.user?.username}
                </p>
              </div>
            </div>
            <div className='dark:text-white md:justify-start flex items-center justify-center w-full py-4 space-x-4 text-gray-800 border-b border-gray-200'>
              <div
                className={`${
                  orderDetail?.order && (orderDetail.order.user?.email || orderDetail.order.user?.account)
                    ? ''
                    : 'hidden'
                } flex items-center gap-x-3`}
              >
                <AiFillMail />
                <p className=' text-sm leading-5 cursor-pointer'>
                  {orderDetail?.order && (orderDetail.order.user?.email || orderDetail.order.user?.account)}
                </p>
              </div>
              <div className='gap-x-3 flex items-center'>
                <HiPhone />
                <p className=' text-sm leading-5 cursor-pointer'>
                  {orderDetail?.order && orderDetail.order.inforOrderShipping.phone}
                </p>
              </div>
            </div>
          </div>
          <div className='xl:h-full md:mt-0 flex flex-col items-stretch justify-between flex-1 w-full mt-6'>
            <div className='md:justify-start xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 xl:space-y-12 md:space-y-0 md:flex-row md:items-start flex flex-col items-center justify-center space-y-4'>
              <div className='gap-x-4 flex justify-center'>
                <p className='dark:text-white md:text-left text-base font-semibold leading-4 text-center text-gray-800'>
                  Address
                </p>
                <p className='lg:w-full dark:text-gray-300 md:text-left text-sm leading-5 text-center text-gray-600'>
                  {orderDetail?.order && orderDetail.order.inforOrderShipping.address}
                </p>
              </div>
              <div className='gap-x-4 flex justify-center'>
                <p className='dark:text-white md:text-left text-base font-semibold leading-4 text-center text-gray-800'>
                  Payment
                </p>
                <p className='lg:w-full dark:text-gray-300 md:text-left text-sm leading-5 text-center text-gray-600 uppercase'>
                  {orderDetail?.order && orderDetail.order.paymentMethodId}
                </p>
              </div>
            </div>
          </div>
          <div className='xl:h-full md:mt-0 flex flex-col items-stretch justify-between flex-1 w-full mt-6'>
            <div className='md:justify-start xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 xl:space-y-12 md:space-y-0 md:flex-row md:items-start flex flex-col items-center justify-center space-y-4'>
              <div className='gap-x-4 flex justify-center'>
                <p className='dark:text-white md:text-left text-base font-semibold leading-4 text-center text-gray-800'>
                  Note
                </p>
                <p className='lg:w-full dark:text-gray-300 md:text-left text-sm leading-5 text-center text-gray-600'>
                  {orderDetail?.order && orderDetail.order.inforOrderShipping.noteShipping}
                </p>
              </div>
              <div className='gap-x-4 flex items-center justify-center'>
                <p className='dark:text-white md:text-left text-base font-semibold leading-4 text-center text-gray-800'>
                  Status
                </p>
                <p
                  className={`capitalize text-white rounded inline-block px-2 py-1   ${
                    orderDetail?.order.status === 'canceled'
                      ? 'bg-red-600'
                      : orderDetail?.order.status === 'pending'
                      ? 'bg-yellow-400'
                      : orderDetail?.order.status === 'done' || orderDetail?.order.status === 'confirmed'
                      ? 'bg-green-400'
                      : 'bg-blue-500'
                  }`}
                >
                  {orderDetail?.order && orderDetail?.order.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table className='dark:divide-gray-600 min-w-full divide-y divide-gray-200'>
        <Table.Head className='dark:bg-gray-700 bg-gray-100'>
          <Table.HeadCell>
            <Label htmlFor='select-all' className='sr-only'>
              Select all
            </Label>
            <Checkbox id='select-all' name='select-all' />
          </Table.HeadCell>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Product image</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>Size price</Table.HeadCell>
          <Table.HeadCell>Toppings</Table.HeadCell>
          {/* <Table.HeadCell>Status</Table.HeadCell> */}
        </Table.Head>
        <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
          {orderDetail?.order &&
<<<<<<< HEAD
            orderDetail?.order.items.map((order, index) => (
              <Table.Row key={order._id} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
                <Table.Cell className='w-4 p-4'>
                  <div className='flex items-center'>
                    <Checkbox aria-describedby='checkbox-1' id='checkbox-1' />
                    <label htmlFor='checkbox-1' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </Table.Cell>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                  <img src={order?.image} className='w-32' alt='' />
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                  {order.product?.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize text-center'>
                  {order.quantity}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                  {formatCurrency(order.price)}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium capitalize'>
                  {order.size.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium capitalize'>
                  {formatCurrency(order.size.price)}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium capitalize'>
                  {order.toppings.map((item: ITopping) => (
                    <>
                      <br />
                      <span>{item.name}</span>
                    </>
                  ))}
                </Table.Cell>
              </Table.Row>
            ))}
=======
            orderDetail?.order.items.map((order, index) => {
              console.log(order, 'fdf')
              return (
                <Table.Row key={order._id} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
                  <Table.Cell className='w-4 p-4'>
                    <div className='flex items-center'>
                      <Checkbox aria-describedby='checkbox-1' id='checkbox-1' />
                      <label htmlFor='checkbox-1' className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                    <img src={order?.image} className='w-32' alt='' />
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                    {order.product?.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize text-center'>
                    {order.quantity}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                    {formatCurrency(order.price)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium capitalize'>
                    {order.size.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium capitalize'>
                    {formatCurrency(order.size.price)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium capitalize'>
                    {order.toppings.map((item: ITopping) => (
                      <>
                        <br />
                        <span>{item.name}</span>
                      </>
                    ))}
                  </Table.Cell>
                </Table.Row>
              )
            })}
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
        </Table.Body>
      </Table>
      <div className='md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8 flex flex-col items-stretch justify-center w-full space-y-4'>
        <div className='md:p-6 xl:p-8 dark:bg-gray-800 flex flex-col w-full px-4 py-6 space-y-6 bg-gray-300'>
          <h3 className='dark:text-white text-xl font-semibold leading-5 text-gray-800'>Summary</h3>
          <div className='flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200'>
            {/* <div className="flex items-center justify-between w-full">
              <p className="dark:text-white text-base leading-4 text-gray-800">Discount</p>
              <p className="dark:text-gray-300 text-base leading-4 text-gray-600">-$28.00 (50%)</p>
            </div> */}
            <div className='flex items-center justify-between w-full'>
              <p className='dark:text-white text-base leading-4 text-gray-800'>Shipping</p>
              <p className='dark:text-gray-300 text-base leading-4 text-gray-600'>
                {orderDetail?.order && formatCurrency(orderDetail?.order.priceShipping)}
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between w-full'>
            <p className='dark:text-white text-base font-semibold leading-4 text-gray-800'>Total</p>
            <p className='dark:text-gray-300 text-base font-semibold leading-4 text-gray-600'>
              {orderDetail?.order && formatCurrency(orderDetail?.order.total)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
