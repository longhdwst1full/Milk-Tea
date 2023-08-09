import { Button, Table } from 'flowbite-react';
import { useLazyGetAllOrderQuery } from '../../../store/slices/order';

import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { LuClipboardEdit } from 'react-icons/lu';
import { StatusOrder } from '../../../store/slices/types/order.type';
import { TbMapPinCancel } from 'react-icons/tb';
import Tooltip from '@mui/material/Tooltip';
import formatDate from '../../../utils/formatDate';
import { useEffect } from 'react';

interface AllOrdersTableProps {
  hanleUpdateOrderCancel: (id: string) => void;
}

const AllOrdersTable = ({ hanleUpdateOrderCancel }: AllOrdersTableProps) => {
  const [trigger, { data: orders, isLoading }] = useLazyGetAllOrderQuery();
  useEffect(() => {
    trigger();
  }, [trigger]);
  if (isLoading) return <Loading />;
  return (
    <Table className="min-w-full min-h-[100vh] divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        {/* <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell> */}
        <Table.HeadCell>Stt</Table.HeadCell>
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Note</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Time order</Table.HeadCell>

        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {orders &&
          orders?.docs.length > 0 &&
          orders.docs.map((order, index) => (
            <Table.Row key={order._id} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
              {/* <Table.Cell className="w-4 p-4">
                <div className="flex items-center">
                  <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                  <label htmlFor="checkbox-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </Table.Cell> */}
              <Table.Cell className="w-4 p-4">{index + 1}</Table.Cell>
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <img className="h-10 w-10 rounded-full" src={order?.user?.avatar} alt="" />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {order?.inforOrderShipping?.name}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {order?.inforOrderShipping?.phone}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {order?.inforOrderShipping?.address}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                {order?.inforOrderShipping?.noteShipping}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                <span
                  className={`text-white ${
                    order.status === 'canceled'
                      ? 'bg-red-600'
                      : order.status === 'pending'
                      ? 'bg-yellow-400'
                      : order.status === 'done' || order.status === 'confirmed'
                      ? 'bg-green-400'
                      : 'bg-blue-500'
                  } rounded inline-block px-2 py-1`}
                >
                  {order.status}
                </span>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium  dark:text-white capitalize ">
                {formatDate(order.createdAt)}
              </Table.Cell>

              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <Tooltip title="Chi tiết đơn hàng">
                    <Button color="primary">
                      <Link to={`/admin/orders/${order._id}`} className="flex items-center gap-x-3">
                        <LuClipboardEdit className="text-xl" />
                      </Link>
                    </Button>
                  </Tooltip>
                  {(order.status === StatusOrder.PENDING ||
                    order.status === StatusOrder.CONFIRMED) && (
                    <Tooltip title="Hủy Đơn Hàng">
                      <Button color="failure" onClick={() => hanleUpdateOrderCancel(order._id)}>
                        {/* <div className="flex items-center gap-x-2">Cancel</div> */}
                        <TbMapPinCancel className="text-xl" />
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default AllOrdersTable;
