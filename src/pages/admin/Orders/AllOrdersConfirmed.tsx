import { Button, Table } from 'flowbite-react'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { TbMapPinCancel } from 'react-icons/tb'
import { Tooltip } from '@mui/material'
// import { dataDocsOrderRes } from '../../../store/slices/types/order.type'
import formatDate from '../../../utils/formatDate'
import { v4 as uuid } from 'uuid'
import { useGetAllOrderComfirmedQuery } from '../../../store/slices/order'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'
import { AiFillEye } from 'react-icons/ai'

interface IProps {
  // dataOrderCofirmed: dataDocsOrderRes[]
  // isLoading: boolean
  // isError: boolean
  hanleUpdateOrderCancel: (id: string) => void
}
const AllOrdersConfirmed = ({ hanleUpdateOrderCancel }: IProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: orderConfirmed, isLoading } = useGetAllOrderComfirmedQuery(currentPage)

  if (isLoading) return <Loading />

  return (
    <>
      <div className='max-h-[calc(500px-45px)] overflow-y-scroll hidden-scroll-bar'></div>
      <Table className='dark:divide-gray-600 min-h-[500px] min-w-full divide-y divide-gray-200'>
        <Table.Head className='dark:bg-gray-700 bg-gray-100'>
          {/* <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell> */}
          <Table.HeadCell>User Name</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Create At</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
          {orderConfirmed &&
            orderConfirmed.docs.map(
              (item) =>
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
                    <Table.Cell className='whitespace-nowrap lg:mr-0 p-4 mr-12 space-x-6'>
                      <div className='flex items-center gap-x-2'>
                        <img className='w-10 h-10 rounded-full' src={item.user.avatar} alt={item.user.username} />
                        <div className='dark:text-gray-400 text-sm font-normal text-gray-500'>
                          <div className='dark:text-white text-base font-semibold text-gray-900'>
                            {item.inforOrderShipping.name}
                          </div>
                          <div className='dark:text-gray-400 text-sm font-normal text-gray-500'>
                            {' '}
                            {item.inforOrderShipping.phone}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                      {item.inforOrderShipping.address}
                    </Table.Cell>
                    <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                      {formatDate(item.createdAt)}
                    </Table.Cell>
                    <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                      <span className='inline-block px-2 py-1 text-white bg-green-400 rounded'>{item.status}</span>
                    </Table.Cell>
                    {/* <Table.Cell className="whitespace-nowrap dark:text-white  p-4 text-base font-medium text-white capitalize">
                    <span className={` rounded inline-block px-2`}>abc</span>
                  </Table.Cell> */}
                    {/* <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize">
                    <span
                      className="inline-block px-2 py-1 text-white bg-yellow-400 rounded"
                    >
                      {item.status}
                    </span>
                  </Table.Cell> */}
                    <Table.Cell>
                      <div className='gap-x-3 whitespace-nowrap flex items-center'>
                        <Button color='primary'>
                          <Link to={`/admin/orders/${item._id}`} className='gap-x-3 flex items-center'>
                            <AiFillEye className='text-xl' />
                          </Link>
                        </Button>
                        <Tooltip title='Hủy Đơn Hàng'>
                          <Button color='failure' onClick={() => hanleUpdateOrderCancel(item._id)}>
                            {/* <div className="gap-x-2 flex items-center">Cancel</div> */}
                            <TbMapPinCancel className='text-xl' />
                          </Button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
            )}
        </Table.Body>
      </Table>
      {orderConfirmed && (
        <PaginateNumber
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={orderConfirmed.totalPages}
        />
      )}
    </>
  )
}

export default AllOrdersConfirmed
