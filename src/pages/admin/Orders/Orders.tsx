import { HiCheckCircle, HiClipboard, HiClipboardCheck, HiClipboardList } from 'react-icons/hi'
import { useCanceledOrderMutation } from '../../../store/slices/order'

import AllOrderDelivered from './AllOrderDelivered'
import AllOrdersCanceled from './AllOrdersCanceled'
import AllOrdersConfirmed from './AllOrdersConfirmed'
import AllOrdersDone from './AllOrdersDone'
import AllOrdersPending from './AllOrdersPending'
import AllOrdersTable from './AllOrdersTable'
import { FaTimesCircle } from 'react-icons/fa'
import { MdLocalShipping } from 'react-icons/md'
import { Tabs } from 'flowbite-react'
// import { dataDocsOrderRes } from '../../../store/slices/types/order.type'
import { toast } from 'react-toastify'

const Orders = () => {
  // const { data, isLoading, isFetching, isError } = useGetAllOrderQuery(1)
  // const [orderPending, setOrderPending] = useState<dataDocsOrderRes[] | []>([])
  // const [orderConfirmed, setOrderConfirmed] = useState<dataDocsOrderRes[] | []>([])
  const [updateOrderCancel] = useCanceledOrderMutation()

  // useEffect(() => {
  //   if (data?.docs) {
  //     setOrderPending(data.docs)
  //     setOrderConfirmed(data.docs)
  //   }
  // }, [data])
  const hanleUpdateOrderCancel = (id: string) => {
    updateOrderCancel(id)
      .unwrap()
      .then(() => {
        toast.success('Cập nhật thành công')
      })
      .catch(() => toast.error('Cập nhật thất bại'))
  }
  return (
    <div className='p-2'>
      <Tabs.Group aria-label='Default tabs' style='default'>
        <Tabs.Item active icon={HiClipboardList} title='All Orders'>
          <AllOrdersTable hanleUpdateOrderCancel={hanleUpdateOrderCancel} />
        </Tabs.Item>
        <Tabs.Item icon={HiClipboard} title='Order pending'>
          <AllOrdersPending
            // dataOrderPending={orderPending}
            // isLoading={isLoading}
            // isError={isError}
            hanleUpdateOrderCancel={hanleUpdateOrderCancel}
          />
        </Tabs.Item>
        <Tabs.Item icon={HiClipboardCheck} title='Order comfirmed'>
          <AllOrdersConfirmed
            // dataOrderCofirmed={orderPending}
            // isLoading={isLoading}
            // isError={isError}
            hanleUpdateOrderCancel={hanleUpdateOrderCancel}
          />
        </Tabs.Item>
        <Tabs.Item icon={MdLocalShipping} title='Order delivered'>
          <AllOrderDelivered />
          {/* <AllOrderDelivered
            dataOrderDeliver={orderPending}
            isLoading={isLoading}
            isError={isError}
          /> */}
        </Tabs.Item>
        <Tabs.Item icon={HiCheckCircle} title='Order done'>
          <AllOrdersDone />
        </Tabs.Item>
        <Tabs.Item icon={FaTimesCircle} title='Order canceled'>
          <AllOrdersCanceled />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  )
}

export default Orders
