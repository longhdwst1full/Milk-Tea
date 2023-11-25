import { Button, Label, TextInput, Tooltip } from 'flowbite-react'

<<<<<<< HEAD
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
=======
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
import { DrawerAddProduct } from '../../../components'
import { FaPlus } from 'react-icons/fa'
import ProductsTable from '../../../components/CrudProduct/listProduct'
import { useState } from 'react'
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df

export default function ProductsList() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <BreadCrumb />
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>Danh sách sản phẩm</h1>
          </div>
          <div className='sm:flex items-center block'>
            <SearchForProducts />

            <div className='sm:justify-end flex items-center w-full'>
              <Tooltip content='Thêm sản phẩm'>
                <Button color='primary' onClick={() => setIsOpenDrawer(!isOpenDrawer)}>
                  <FaPlus className='mr-3 text-sm' />
                  Thêm sản phẩm
                </Button>
              </Tooltip>

<<<<<<< HEAD
              {/* <DrawerAddProduct setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} /> */}
=======
              <DrawerAddProduct setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} />
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
              {/* {isOpenModalAdd ? <AddProductModal isOpen={isOpenModalAdd} setIsOpen={setOpenModalAdd} /> : ''} */}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
<<<<<<< HEAD
            <div className='overflow-hidden shadow'>{/* <ProductsTable /> */}</div>
=======
            <div className='overflow-hidden shadow'>
              <ProductsTable />
            </div>
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
          </div>
        </div>
      </div>
    </>
  )
}

const SearchForProducts = function () {
  return (
    <form className='sm:mb-0 sm:pr-3 mb-4' action='#' method='GET'>
      <Label htmlFor='products-search' className='sr-only'>
        Search
      </Label>
      <div className='lg:w-64 xl:w-96 relative mt-1'>
        <TextInput id='products-search' name='products-search' placeholder='Search for products' />
      </div>
    </form>
  )
}
