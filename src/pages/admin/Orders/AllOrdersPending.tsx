import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { LuClipboardEdit } from 'react-icons/lu';
import { TbMapPinCancel } from 'react-icons/tb';
import { Tooltip } from '@mui/material';
import { dataDocsOrderRes } from '../../../store/slices/types/order.type';
import formatDate from '../../../utils/formatDate';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  dataOrderPending: dataDocsOrderRes[];
  isLoading: boolean;
  isError: boolean;
  hanleUpdateOrderCancel: (id: string) => void;
}
const AllOrdersPending = ({ dataOrderPending, isLoading, hanleUpdateOrderCancel }: IProps) => {
  const [orderPending, setOrderPending] = useState<dataDocsOrderRes[] | []>([]);
  useEffect(() => {
    if (dataOrderPending) {
      setOrderPending(dataOrderPending);
    }
  }, [dataOrderPending]);

  if (isLoading) return <Loading />;
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="dark:bg-gray-700 bg-gray-100">
        <Table.HeadCell>Stt</Table.HeadCell>
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Create At</Table.HeadCell>
        {/* <Table.HeadCell>Status</Table.HeadCell> */}
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200">
        {orderPending &&
          orderPending.map((item, index: number) => {
            if (item.status == 'pending')
              return (
                // <Table.Row key={index} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
                //   <Table.Cell className="whitespace-nowrap lg:mr-0 flex items-center p-4 mr-12 space-x-6">
                //     <img className="w-10 h-10 rounded-full" src={item.user.avatar} alt="" />
                //     <div className="dark:text-gray-400 text-sm font-normal text-gray-500">
                //       <div className="dark:text-white text-base font-semibold text-gray-900">
                //         {item.user.username}
                //       </div>
                //       <div className="dark:text-gray-400 text-sm font-normal text-gray-500">
                //         {item.user.account}
                //       </div>
                //     </div>
                //   </Table.Cell>
                //   <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize">
                //     {item.inforOrderShipping.address}
                //   </Table.Cell>
                //   <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize">
                //     {formatDate(item.createdAt)}
                //   </Table.Cell>
                //   <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-white capitalize">
                //     <span className={` rounded inline-block px-2`}>{item.is_active}</span>
                //   </Table.Cell>
                //   <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize">
                //     <span className="inline-block px-2 py-1 text-white bg-yellow-400 rounded">
                //       {item.status}
                //     </span>
                //   </Table.Cell>
                //   <Table.Cell>
                //     <div className="gap-x-3 whitespace-nowrap flex items-center">
                //       <Button color="primary">
                //         <Link
                //           to={`/admin/orders/${item._id}`}
                //           className="gap-x-3 flex items-center"
                //         >
                //           <HiPlus className="text-xl" />
                //           Detail
                //         </Link>
                //       </Button>
                //       <Button color="failure">
                //         <div className="gap-x-2 flex items-center">Delete order</div>
                //       </Button>
                //     </div>
                //   </Table.Cell>
                // </Table.Row>
                <Table.Row
                  className="dark:border-gray-700 dark:bg-gray-800 bg-white"
                  key={uuidv4()}
                >
                  <Table.Cell className="whitespace-nowrap dark:text-white font-medium text-gray-900">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <img className="w-10 h-10 rounded-full" src={item.user?.avatar} alt="" />
                      <div className="dark:text-gray-400 text-sm font-normal text-gray-500">
                        <div className="dark:text-white text-base font-semibold text-gray-900">
                          {item.inforOrderShipping.name}
                        </div>
                        <div className="dark:text-gray-400 text-sm font-normal text-gray-500">
                          {item.inforOrderShipping.phone}
                        </div>{' '}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item.inforOrderShipping.address}</Table.Cell>
                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                  {/* <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize">
                    <span className="inline-block px-2 py-1 text-white bg-yellow-400 rounded">
                      {item.status ? item.status : 'pending'}
                    </span>
                  </Table.Cell> */}
                  <Table.Cell>
                    <div className="gap-x-3 whitespace-nowrap flex items-center">
                      <Tooltip title="Chi tiết đơn hàng">
                        <Button color="primary">
                          <Link
                            to={`/admin/orders/${item._id}`}
                            className="gap-x-3 flex items-center"
                          >
                            <LuClipboardEdit className="text-xl" />
                          </Link>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Hủy Đơn Hàng">
                        <Button color="failure" onClick={() => hanleUpdateOrderCancel(item._id)}>
                          {/* <div className="flex items-center gap-x-2">Cancel</div> */}
                          <TbMapPinCancel className="text-xl" />
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
          })}
      </Table.Body>
    </Table>
  );
};

export default AllOrdersPending;
