import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { LuClipboardEdit } from 'react-icons/lu';
import { TbMapPinCancel } from 'react-icons/tb';
import { Tooltip } from '@mui/material';
import { dataDocsOrderRes } from '../../../store/slices/types/order.type';
import formatDate from '../../../utils/formatDate';
import { v4 as uuid } from 'uuid';

interface IProps {
  dataOrderCofirmed: dataDocsOrderRes[];
  isLoading: boolean;
  isError: boolean;
  hanleUpdateOrderCancel: (id: string) => void;
}
const AllOrdersConfirmed = ({ dataOrderCofirmed, isLoading, hanleUpdateOrderCancel }: IProps) => {
  const [orderPending, setOrderPending] = useState<dataDocsOrderRes[] | []>([]);
  useEffect(() => {
    if (dataOrderCofirmed) {
      setOrderPending(dataOrderCofirmed);
    }
  }, [dataOrderCofirmed]);
  if (isLoading) return <Loading />;

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        {/* <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell> */}
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Create At</Table.HeadCell>
        {/* <Table.HeadCell>Deleted</Table.HeadCell> */}
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {orderPending &&
          orderPending.map(
            (item, index) =>
              item.status == 'confirmed' && (
                <Table.Row key={uuid()} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
                  {/* <Table.Cell className="w-4 p-4">
                    <div className="flex items-center">
                      <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                      <label htmlFor="checkbox-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </Table.Cell> */}
                  <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={item.user.avatar}
                      alt={item.user.username}
                    />
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.inforOrderShipping.name}
                      </div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {' '}
                        {item.inforOrderShipping.phone}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                    {item.inforOrderShipping.address}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                    {formatDate(item.createdAt)}
                  </Table.Cell>
                  {/* <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-white dark:text-white capitalize ">
                    <span className={` rounded inline-block px-2`}>abc</span>
                  </Table.Cell> */}
                  {/* <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                    <span
                      className="text-white
                      rounded inline-block px-2 py-1   bg-yellow-400"
                    >
                      {item.status}
                    </span>
                  </Table.Cell> */}
                  <Table.Cell>
                    <div className="flex items-center gap-x-3 whitespace-nowrap">
                      <Button color="primary">
                        <Link
                          to={`/admin/orders/${item._id}`}
                          className="flex items-center gap-x-3"
                        >
                          <LuClipboardEdit className="text-xl" />
                        </Link>
                      </Button>
                      <Tooltip title="Hủy Đơn Hàng">
                        <Button color="failure" onClick={() => hanleUpdateOrderCancel(item._id)}>
                          {/* <div className="flex items-center gap-x-2">Cancel</div> */}
                          <TbMapPinCancel className="text-xl" />
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
          )}
      </Table.Body>
    </Table>
  );
};

export default AllOrdersConfirmed;
