import { Button, Table } from 'flowbite-react'

import { Link } from 'react-router-dom'
import formatDate from '../../../utils/formatDate'
import { useGetAllOrderCancelQuery } from '../../../store/slices/order'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'
import { AiFillEye } from 'react-icons/ai'
// import { type } from 'os'

const AllOrdersCanceled = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data } = useGetAllOrderCancelQuery(currentPage)

  return (
    <>
      <div className='max-h-[500px] overflow-y-scroll hidden-scroll-bar'>
        <Table hoverable className='min-w-full min-h-[500px] divide-y divide-gray-200 dark:divide-gray-600'>
          <Table.Head>
            <Table.HeadCell>Stt</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Time Order</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
            {/* <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell> */}
          </Table.Head>
          <Table.Body className='divide-y'>
            {data &&
              data.docs.length > 0 &&
              data.docs.map((item, index) => (
                <Table.Row className='dark:border-gray-700 dark:bg-gray-800 w-full bg-white' key={uuid()}>
                  <Table.Cell className='whitespace-nowrap dark:text-white font-medium text-gray-900'>
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center gap-4'>
                      <img
                        className='h-14 w-14 object-cover rounded-full'
                        src={item.user?.avatar}
                        alt={item.inforOrderShipping.name}
                      />
                      <div className=''>
                        <p className='dark:text-white text-base font-semibold text-gray-900'>{item.user?.username}</p>
                        <p className='dark:text-gray-400 text-sm font-normal text-gray-500'>
                          {item.inforOrderShipping.phone}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item.inforOrderShipping.address}</Table.Cell>
                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                    <span className='inline-block px-2 py-1 text-white bg-red-600 rounded'>{item.status}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color='primary'>
                      <Link to={`/admin/orders/${item._id}`} className='gap-x-3 flex items-center'>
                        <AiFillEye className='text-xl' />
                      </Link>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            {data && data.docs.length === 0 && (
              <Table.Row className='dark:border-gray-700 dark:bg-gray-800 w-full bg-white'>
                <Table.Cell className='whitespace-nowrap dark:text-white flex items-center justify-center font-medium text-gray-900'>
                  No data
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      {data && <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={data.totalPages} />}
    </>
  )
}

export default AllOrdersCanceled
