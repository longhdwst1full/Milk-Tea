import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { LuClipboardEdit } from 'react-icons/lu';
import { dataDocsOrderRes } from '../../../store/slices/types/order.type';
import formatDate from '../../../utils/formatDate';
import { v4 as uuidv4 } from 'uuid';

interface AllOrderDeliveredProps {
  dataOrderDelivery: dataDocsOrderRes[];
  isFetching: boolean;
  isError?: boolean;
}

const AllOrderDelivered = ({ dataOrderDelivery, isFetching }: AllOrderDeliveredProps) => {
  const [orderDelivery, setorderDelivery] = useState<dataDocsOrderRes[] | []>([]);
  useEffect(() => {
    if (dataOrderDelivery) {
      setorderDelivery(dataOrderDelivery);
    }
  }, [dataOrderDelivery]);
  if (isFetching) return <Loading />;
  // import { Link } from 'react-router-dom';
  // import { HiPlus } from 'react-icons/hi';
  // import { dataDocsOrderRes } from '../../../store/slices/types/order.type';
  // import { useEffect, useState } from 'react';
  // import Loading from '../../../components/Loading';
  // import formatDate from '../../../utils/formatDate';

  // interface IProps {
  //   dataOrderDeliver: dataDocsOrderRes[];
  //   isLoading: boolean;
  //   isError: boolean;
  // }
  // const AllOrderDelivered = ({ dataOrderDeliver, isLoading }: IProps) => {
  //   const [orderPending, setOrderPending] = useState<dataDocsOrderRes[] | []>([]);
  //   useEffect(() => {
  //     if (dataOrderDeliver) {
  //       setOrderPending(dataOrderDeliver);
  //     }
  //   }, [dataOrderDeliver]);

  //   if (isLoading) return <Loading />;
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head>
        <Table.HeadCell>Stt</Table.HeadCell>
        <Table.HeadCell>Username</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Time Order</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {orderDelivery &&
          orderDelivery.map((item, index: number) => {
            if (item.status == 'delivered') {
              return (
                <Table.Row
                  key={uuidv4()}
                  className={`dark:border-gray-700 dark:bg-gray-800 w-full bg-white`}
                >
                  <Table.Cell className="whitespace-nowrap dark:text-white font-medium text-gray-900">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <img
                        className="h-14 w-14 object-cover rounded-full"
                        src={item.user?.avatar}
                        alt={item.inforOrderShipping.name}
                      />
                      <div className="">
                        <p className="dark:text-white text-base font-semibold text-gray-900">
                          {item.user?.username}
                        </p>
                        <p className="dark:text-gray-400 text-sm font-normal text-gray-500">
                          {item.inforOrderShipping?.phone}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item.inforOrderShipping.address}</Table.Cell>
                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                  <Table.Cell>
                    <Button color="primary">
                      <Link to={`/admin/orders/${item._id}`} className="gap-x-3 flex items-center">
                        <LuClipboardEdit className="text-xl" />
                        Detail
                      </Link>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
      </Table.Body>
    </Table>
  );
};

export default AllOrderDelivered;
