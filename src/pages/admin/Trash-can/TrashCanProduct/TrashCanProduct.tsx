import { AiFillEye, AiOutlineSearch } from 'react-icons/ai'
import { Button, Input, Space, Table, Select, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useRef, useState } from 'react'
import type { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import './TrashCanProduct.scss'
import { useDeleteRealProductMutation, useFetchProductsQuery, useRestoreProductMutation } from '../../../../api/Product'
import { IProduct } from '../../../../interfaces/products.type'
import { GrPowerReset } from 'react-icons/gr'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { pause } from '../../../../utils/pause'
import Loading from '../../../../components/Loading'

interface DataType extends Omit<IProduct, '_id' | 'images' | 'category'> {
  key: string
  images: string
  _id?: string
  category: string
}
type DataIndex = keyof DataType
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue | null>
}
const TrashCanProduct = () => {
  const { data: productData, isLoading } = useFetchProductsQuery(0)
  const [deleteRealProductFN, deleteRealProductRes] = useDeleteRealProductMutation()
  const [restoreProductFN, restoreProductRes] = useRestoreProductMutation()

  console.log(productData, '::')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useState<IProduct[]>(productData?.docs ? productData.docs : [])
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: productData?.limit
    }
  })

  console.log(productData)
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    })
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }
  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0
  let data: DataType[] = []
  if (productData && productData.docs) {
    data = productData.docs.map((item: IProduct) => ({
      key: item?._id,
      name: item.name,
      images: item.images?.[0]?.url || '',
      description: item.description,
      price: item.price,
      sale: item.sale,
      category: item.category?.name,
      sizes: item.sizes.map((size) => ({ name: size.name, price: size.price })),
      toppings: item.toppings,
      is_deleted: item.is_deleted,
      is_active: item.is_active,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))
  }

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<AiOutlineSearch className='text-[15px]' />}
            size='small'
            style={{ width: 90, backgroundColor: 'blue' }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <AiOutlineSearch className='text-[15px]' style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'INDEX',
      dataIndex: 'stt',
      // width: '5%',
      render: (_, __, index) => index + 1,
      className: 'hidden md:table-cell dark:bg-gray-900 dark:text-[#ffffff]'
    },
    {
      title: 'PRODUCT NAME',
      dataIndex: 'name',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      key: 'name',
      // width: '27%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'IMAGES',
      dataIndex: 'images',
      key: 'images',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      // width: '20%',
      render: (image) => <img className='w-[70px]' src={image} alt='product image' />
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      // width: '25%',
      ...getColumnSearchProps('category')
    },
    {
      title: 'ACTION',
      key: 'action',
      // width: '20%',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      render: () => (
        <>
          <Space size='middle' className='hidden md:flex'>
            <Button className='bg-[#d46b08] sm:h-[35px] lg:h-[40px] '>
              <Link style={{ color: 'white', margin: 'auto' }} to={`#`}>
                <AiFillEye className='md:text-[13px]  lg:text-lg' />
              </Link>
            </Button>
            <Button className='bg-[#1d39c4] sm:h-[35px] lg:h-[40px] dark:bg-none'>
              <Link style={{ color: 'white', margin: 'auto' }} to={`#`}>
                {/* <GrPowerReset className='md:text-[13px] lg:text-lg' /> */}
                <GrPowerReset className='md:text-[13px] lg:text-lg' />
              </Link>
            </Button>
            <Popconfirm
              title='Xóa vĩnh viễn sản phẩm này?'
              description='Khi thực hiện, bạn sẽ không thể khôi phục sản phẩm này!'
              onConfirm={async () => {
                // await pause(1000)
                // await removeProduct(record.key)
                message.success('Xóa sản phẩm thành công')
              }}
              okText='Yes'
              okButtonProps={{
                style: { backgroundColor: 'blue' }
              }}
              cancelText='No'
            >
              <Button className='bg-[#f5222d] sm:h-[35px] lg:h-[40px]'>
                <RiDeleteBin6Fill className='text-[#ffffff] md:text-[13px] lg:text-lg ' />
              </Button>
            </Popconfirm>
          </Space>
          <div className='text-right inline-block md:hidden lg:hidden'>
            <GiHamburgerMenu />
          </div>
        </>
      )
    }
  ]
  // console.log(productData);

  const OPTIONS = ['Cà phê', 'Sữa chua dẻo', 'Trà sữa', '	Macchiato Cream Cheese']
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleProductAll = (type: string) => {
    console.log('a', selectedRowKeys)

    selectedRowKeys.length > 0 &&
      selectedRowKeys.forEach((item) => {
        console.log('1')
        console.log(item)
        if (type == 'deleteRealProduct') {
          deleteRealProductFN(item as string)
        }
        if (type == 'RestoreProduct') {
          restoreProductFN(item as string)
        }
      })
  }
  return (
    <div className='dark:text-[#ffffff] dark:bg-gray-900'>
      <h1 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-3 '>Đã xóa gần đây</h1>
      <div className='flex'>
        <h2 className='text-[15px]'>Tìm theo danh mục:</h2>
        <Select
          className='w-full max-w-[250px] ml-[20px] custom-select !border-none !outline-none focus:!ring-0'
          mode='multiple'
          allowClear={true}
          placeholder='Lọc theo danh mục'
          value={selectedItems}
          onChange={setSelectedItems}
          options={OPTIONS.map((item) => ({
            value: item,
            label: item
          }))}
          style={{}}
        />
        <div className='ml-2'>
          <Button
            disabled={restoreProductRes.isLoading || deleteRealProductRes.isLoading || selectedRowKeys.length < 1}
            className='sm:h-[35px] lg:h-[40px] bg-green-500 text-[#ffffff] md:text-[13px] lg:text-lg hover:text-gray-200 mr-2 '
            onClick={() => handleProductAll('RestoreProduct')}
          >
            Khôi phục All
          </Button>
          <Button
            disabled={restoreProductRes.isLoading || deleteRealProductRes.isLoading || selectedRowKeys.length < 1}
            className='bg-[#f5222d] sm:h-[35px] lg:h-[40px] text-[#ffffff] md:text-[13px] lg:text-lg  '
          >
            <Popconfirm
              title='Xóa vĩnh viễn sản phẩm này?'
              description='Khi thực hiện, bạn sẽ không thể khôi phục sản phẩm này!'
              onConfirm={async () => {
                await pause(1000)
                handleProductAll('deleteRealProduct')
                message.success('Xóa sản phẩm thành công')
              }}
              okText='Yes'
              okButtonProps={{
                style: { backgroundColor: 'blue' }
              }}
              cancelText='No'
            >
              Xóa Vĩnh viễn
            </Popconfirm>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
            <Table
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
              onChange={handleTableChange}
              // onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<RecordType> | SorterResult<RecordType>[], extra: TableCurrentDataSource<RecordType>) => void;
              pagination={{
                pageSize: productData?.limit,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
                showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total} items`,
                showQuickJumper: true,
                ...tableParams.pagination
              }}
              className='sm:table-auto md:table-auto lg:table-fixed xl:table-fixed'
            />
            <Button onClick={start} disabled={!hasSelected} loading={loading} className='dark:text-[#ffffff] '>
              Reload
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrashCanProduct
