import { Tabs } from 'flowbite-react';
import { HiClipboardList, HiClipboard, HiCheckCircle, HiClipboardCheck } from 'react-icons/hi';
import { MdLocalShipping } from 'react-icons/md';
import AllOrdersTable from './AllOrdersTable';
import AllOrdersPending from './AllOrdersPending';
import AllOrdersConfirmed from './AllOrdersConfirmed';
import AllOrderDelivered from './AllOrderDelivered';
import AllOrdersDone from './AllOrdersDone';
import AllOrdersCanceled from './AllOrdersCanceled';
import { FaTimesCircle } from 'react-icons/fa';
import { useGetAllOrderQuery } from '../../../store/slices/order';
import { dataDocsOrderRes } from '../../../store/slices/types/order.type';
import { useEffect, useState } from 'react';

const Orders = () => {
  const { data, isLoading, isError } = useGetAllOrderQuery();
  const [orderPending, setOrderPending] = useState<dataDocsOrderRes[] | []>([]);
  useEffect(() => {
    if (data?.docs) {
      setOrderPending(data.docs);
    }
  }, [data]);
  console.log(data?.docs);
  return (
    <div className="p-2">
      <Tabs.Group aria-label="Default tabs" style="default">
        <Tabs.Item active icon={HiClipboardList} title="All Orders">
          <AllOrdersTable />
        </Tabs.Item>
        <Tabs.Item icon={HiClipboard} title="Order pending">
          <AllOrdersPending
            dataOrderPending={orderPending}
            isLoading={isLoading}
            isError={isError}
          />
        </Tabs.Item>
        <Tabs.Item icon={HiClipboardCheck} title="Order comfirmed">
          <AllOrdersConfirmed
            dataOrderCofirmed={orderPending}
            isLoading={isLoading}
            isError={isError}
          />
        </Tabs.Item>
        <Tabs.Item icon={MdLocalShipping} title="Order delivered">
          <AllOrderDelivered />
        </Tabs.Item>
        <Tabs.Item icon={HiCheckCircle} title="Order done">
          <AllOrdersDone />
        </Tabs.Item>
        <Tabs.Item icon={FaTimesCircle} title="Order canceled">
          <AllOrdersCanceled />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default Orders;
