import { AiFillMail, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button, Checkbox, Label, Select, Table, TextInput } from 'flowbite-react';
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiPhone,
  HiTrash,
} from 'react-icons/hi';
import {
  useCanceledOrderMutation,
  useConfirmOrderMutation,
  useDeliveredOrderMutation,
  useDoneOrderMutation,
  useGetOrderByidQuery,
} from '../../../store/slices/order';

import { IOrderDetailResponse } from '../../../interfaces/order.type';
import Loading from '../../../components/Loading';
import { formatCurrency } from '../../../utils/formatCurrency';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ITopping } from '../../../interfaces/topping.type';

const OrderDetail = () => {
  const { id } = useParams();
  const { data: orderDetail, isLoading } = useGetOrderByidQuery(id!);
  const [confirmOrder, { isError: isConfirmErr, isLoading: isConfirming }] =
    useConfirmOrderMutation();
  const [doneOrder, { isError: isDoneErr, isLoading: isDoning }] = useDoneOrderMutation();
  const [deliveredOrder, { isError: isDeliveredErr, isLoading: isDelivering }] =
    useDeliveredOrderMutation();
  const [canceledOrder, { isError: isCancelErr, isLoading: isCanceling }] =
    useCanceledOrderMutation();

  const handleSetConfirmStatus = () => {
    if (id) {
      confirmOrder(id).then(() => {
        if (!isConfirmErr) {
          toast.success('Change status success');
        } else {
          toast.error('Change status failed');
        }
      });
    }
  };

  const handleSetDoneStatus = () => {
    if (id) {
      doneOrder(id).then(() => {
        if (!isDoneErr) {
          toast.success('Change status success');
        } else {
          toast.error('Change status failed');
        }
      });
    }
  };

  const handleSetDeliveredStatus = () => {
    if (id) {
      deliveredOrder(id).then(() => {
        if (!isDeliveredErr) {
          toast.success('Change status success');
        } else {
          toast.error('Change status failed');
        }
      });
    }
  };

  const handleSetCanceledStatus = () => {
    if (id) {
      canceledOrder(id).then(() => {
        if (!isCancelErr) {
          toast.success('Change status success');
        } else {
          toast.error('Change status failed');
        }
      });
    }
  };
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order Detail
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput id="users-search" name="users-search" placeholder="Search for users" />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button
                disabled={
                  orderDetail?.order.status === 'canceled' ||
                  orderDetail?.order.status === 'delivered' ||
                  orderDetail?.order.status === 'confirmed' ||
                  orderDetail?.order.status === 'done'
                }
                color="primary"
                onClick={handleSetConfirmStatus}
              >
                {isConfirming ? (
                  <AiOutlineLoading3Quarters className="text-lg rotate" />
                ) : (
                  'Confirm'
                )}
              </Button>
              <Button
                color="warning"
                disabled={
                  orderDetail?.order.status === 'canceled' ||
                  orderDetail?.order.status === 'pending' ||
                  orderDetail?.order.status === 'done'
                }
                onClick={handleSetDeliveredStatus}
              >
                {isDelivering ? (
                  <AiOutlineLoading3Quarters className="text-lg rotate" />
                ) : (
                  ' Delivery'
                )}
              </Button>
              <Button
                disabled={
                  orderDetail?.order.status === 'confirmed' ||
                  orderDetail?.order.status === 'delivered' ||
                  orderDetail?.order.status === 'done'
                }
                color="failure"
                onClick={handleSetCanceledStatus}
              >
                {isCanceling ? (
                  <AiOutlineLoading3Quarters className="text-lg rotate" />
                ) : (
                  'Canceled'
                )}
              </Button>
              <Button
                disabled={
                  orderDetail?.order.status === 'canceled' ||
                  orderDetail?.order.status === 'pending'
                }
                color="success"
                onClick={handleSetDoneStatus}
              >
                {isDoning ? <AiOutlineLoading3Quarters className="text-lg rotate" /> : 'Done'}
              </Button>
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <OrderDetailTable orderDetail={orderDetail!} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type OrderDetailTableProps = {
  orderDetail: IOrderDetailResponse;
  isLoading: boolean;
};
const OrderDetailTable = ({ orderDetail, isLoading }: OrderDetailTableProps) => {
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-800 w-full  flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
        <div className="flex justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 ">
          <div className="flex flex-col justify-start items-start flex-shrink-0 flex-1">
            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
              <img
                src={orderDetail?.order && orderDetail?.order.user.avatar}
                alt="avatar"
                className="w-32"
              />
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                  {orderDetail?.order && orderDetail.order.user?.username}
                </p>
              </div>
            </div>
            <div className="flex justify-center  text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <div
                className={`${
                  orderDetail?.order &&
                  (orderDetail.order.user?.email || orderDetail.order.user?.account)
                    ? ''
                    : 'hidden'
                } flex items-center gap-x-3`}
              >
                <AiFillMail />
                <p className="cursor-pointer text-sm leading-5 ">
                  {orderDetail?.order &&
                    (orderDetail.order.user?.email || orderDetail.order.user?.account)}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <HiPhone />
                <p className="cursor-pointer text-sm leading-5 ">
                  {orderDetail?.order && orderDetail.order.inforOrderShipping.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 flex-1">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Address
                </p>
                <p className="lg:w-full dark:text-gray-300  text-center md:text-left text-sm leading-5 text-gray-600">
                  {orderDetail?.order && orderDetail.order.inforOrderShipping.address}
                </p>
              </div>
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Payment
                </p>
                <p className="lg:w-full dark:text-gray-300  text-center md:text-left text-sm leading-5 text-gray-600">
                  {orderDetail?.order && orderDetail.order.paymentMethodId}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 flex-1">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Note
                </p>
                <p className="lg:w-full dark:text-gray-300  text-center md:text-left text-sm leading-5 text-gray-600">
                  {orderDetail?.order && orderDetail.order.inforOrderShipping.noteShipping}
                </p>
              </div>
              <div className="flex justify-center items-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Status
                </p>
                <p
                  className={`capitalize text-white rounded inline-block px-2 py-1   ${
                    orderDetail?.order.status === 'canceled'
                      ? 'bg-red-600'
                      : orderDetail?.order.status === 'pending'
                      ? 'bg-yellow-400'
                      : orderDetail?.order.status === 'done' ||
                        orderDetail?.order.status === 'confirmed'
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

      <Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
            <Checkbox id="select-all" name="select-all" />
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
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {orderDetail?.order &&
            orderDetail?.order.items.map((order, index) => (
              <Table.Row key={order._id} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
                <Table.Cell className="w-4 p-4">
                  <div className="flex items-center">
                    <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                    <label htmlFor="checkbox-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </Table.Cell>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  <img src={order.product.images[0].url} className="w-32" alt="" />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                  {order.product.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                  {order.quantity}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                  {formatCurrency(order.price)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium  dark:text-white capitalize ">
                  {order.size.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium  dark:text-white capitalize ">
                  {formatCurrency(order.size.price)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium  dark:text-white capitalize ">
                  {order.toppings.map((item: ITopping) => (
                    <>
                      <br />
                      <span>{item.name}</span>
                    </>
                  ))}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-300  dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            {/* <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Discount</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
            </div> */}
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                {orderDetail?.order && formatCurrency(orderDetail?.order.priceShipping)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
              {orderDetail?.order && formatCurrency(orderDetail?.order.total)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
