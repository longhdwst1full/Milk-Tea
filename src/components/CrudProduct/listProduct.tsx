import { Button, Table, Tooltip, Checkbox } from 'flowbite-react'
import { useDeleteFakeProductMutation, useFetchProductsQuery } from '../../api/Product'

import { HiTrash } from 'react-icons/hi'
import Loading from '../Loading'
import ShowProduct from './showProduct'
import { formatCurrency } from '../../utils/formatCurrency'
import PaginateNumber from '../admin/PaginationWithNumber'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import DrawerEditProduct from './DrawerEditProduct'

const ProductsTable = function () {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isLoading } = useFetchProductsQuery(currentPage)
  const [deleteFakeProduct] = useDeleteFakeProductMutation()
  const [ChildChecks, setChildChecks] = useState<{ [key: string]: boolean }>({})
  const [acceptChecked, setAcceptChecked] = useState(false)
  useEffect(() => {
    const initialChildChecks: { [key: string]: boolean } = {}
    if (data?.docs) {
      data?.docs.forEach((item) => {
        initialChildChecks[item._id] = false
      })
    }
    setChildChecks(initialChildChecks)
  }, [data?.docs])
  useEffect(() => {
    const allChildChecksChecked = Object.values(ChildChecks).every((isChecked) => isChecked)
    setAcceptChecked(allChildChecksChecked)
  }, [ChildChecks])

  const handleAcceptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setAcceptChecked(isChecked)

    const updatedChildChecks: { [key: string]: boolean } = {}
    for (const key in ChildChecks) {
      updatedChildChecks[key] = isChecked
    }
    setChildChecks(updatedChildChecks)
  }

  const handleChildChange = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const isChecked = event.target.checked

    setChildChecks((prevChildChecks) => ({
      ...prevChildChecks,
      [itemId]: isChecked
    }))
  }
  const onHandleDeleteFake = (id: string) => {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to delete this product. You can restore this product in trash can page.',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFakeProduct(id)
          .unwrap()
          .then(() => toast.success('Xóa thành công'))
          .catch(() => toast.error('Xóa thất bại'))
      }
    })
  }
  if (isLoading) return <Loading />

  return (
    <>
      <div className='max-h-[500px] overflow-y-scroll hidden-scroll-bar'>
        <Table className='dark:divide-gray-600 min-w-full min-h-[500px] divide-y divide-gray-200'>
          <Table.Head className='dark:bg-gray-700 text-center bg-gray-100'>
            <Table.HeadCell>
              <Checkbox checked={acceptChecked} onChange={handleAcceptChange} />
            </Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Size</Table.HeadCell>
            {/* <Table.HeadCell>Pri</Table.HeadCell> */}
            <Table.HeadCell>Images</Table.HeadCell>
            <Table.HeadCell colSpan={3}>Actions</Table.HeadCell>
          </Table.Head>
          {/* {isLoading ? (
          <h2>Loading</h2>
        ) : ( */}
          <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
            {data?.docs.map((product) => (
              <Table.Row key={product._id} className='hover:bg-gray-100 dark:hover:bg-gray-700 text-center'>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                  <Checkbox
                    id={`${product._id}`}
                    checked={ChildChecks[product._id]}
                    onChange={(e) => handleChildChange(e, product._id)}
                  />
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-gray-400 p-4 text-sm font-normal text-gray-500'>
                  <div className='dark:text-white text-base font-semibold text-gray-900'>{product.name}</div>
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                  {product.category?.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                  {product.sizes?.map((item) => (
                    <ul key={item.price + 1}>
                      <li className='flex justify-between p-1 mb-0.5'>
                        <span>{item.name}</span>
                        <span className='mr-1'> {formatCurrency(item.price)}</span>
                      </li>
                    </ul>
                  ))}
                </Table.Cell>
                {/* <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                  {formatCurrency(product.price)}
                </Table.Cell> */}
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                  <img src={product.images[0]?.url} alt='' className='w-20 h-20' />
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap p-4 space-x-2'>
                  <div className='gap-x-3 flex items-center'>
                    {/* <Button color="primary" onClick={() => setOpenModalEdit(!isOpenModalEdit)}>
                      <FaPlus className="mr-3 text-sm" />
                      Edit product
                    </Button> */}
                    <ShowProduct product={product} />

                    {/* <EditProductModal DataEdit={product} /> */}
                    <DrawerEditProduct DataEdit={product} />
                    <Tooltip content='Xoá sản phẩm'>
                      <Button color='failure' onClick={() => onHandleDeleteFake(product._id)}>
                        <HiTrash className='text-center' />
                      </Button>
                    </Tooltip>
                    {/* {isOpenModalEdit ? ( */}
                    {/* ) : (
                      ''
                    )} */}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {data && <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={data.totalPages} />}
    </>
  )
}

export default ProductsTable
