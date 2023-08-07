import { Button, Checkbox, Table } from 'flowbite-react';
import { FC, useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import EditProductModal from './editProduct';
import {
  useDeleteFakeProductMutation,
  useDeleteRealProductMutation,
  useFetchProductsQuery,
} from '../../api/Product';
import { FaPlus } from 'react-icons/fa';
import { formatCurrency } from '../../utils/formatCurrency';
import { AiFillEye } from 'react-icons/ai';
import ShowProduct from './showProduct';

const ProductsTable: FC = function () {
  const [isOpenModalEdit, setOpenModalEdit] = useState(false);
  const { data, isLoading } = useFetchProductsQuery();
  const [deleteFakeProduct] = useDeleteFakeProductMutation();

  return (
    <Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700 text-center">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>Index</Table.HeadCell>
        <Table.HeadCell>Product Name</Table.HeadCell>
        <Table.HeadCell>Images</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell colSpan={3}>Actions</Table.HeadCell>
      </Table.Head>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {data?.docs.map((product, index: number) => (
            <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 text-center">
              <Table.Cell className="w-4 p-4">
                <Checkbox />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                <img src={product.images[0]?.url} alt="" className="h-10 w-10" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {product.category?.name}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </Table.Cell>
              <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                <div className="flex items-center gap-x-3">
                  {/* <Button color="primary" onClick={() => setOpenModalEdit(!isOpenModalEdit)}>
                    <FaPlus className="mr-3 text-sm" />
                    Edit product
                  </Button> */}
                  <ShowProduct product={product} />
                  <EditProductModal DataEdit={product} />
                  <Button color="failure" onClick={() => deleteFakeProduct(product._id!)}>
                    <HiTrash className="text-center" />
                  </Button>
                  {/* {isOpenModalEdit ? ( */}
                  {/* ) : (
                    ''
                  )} */}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      )}
    </Table>
  );
};

export default ProductsTable;
