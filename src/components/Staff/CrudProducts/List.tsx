import { AiFillEye, AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai'
import { Button, Input, Popconfirm, Space, Table, message } from 'antd'
import type { ColumnType, ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useDeleteFakeProductMutation, useFetchProductsQuery } from '../../../api/Product'
import { useEffect, useRef, useState } from 'react'
import type { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { IProduct } from '../../../interfaces/products.type'
import type { InputRef } from 'antd'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import qs from 'qs'
import { AtomSpinner } from 'react-epic-spinners'

interface DataType extends IProduct {
  key: string | React.Key | undefined
}
type DataIndex = keyof DataType
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue | null>
}
const List = () => {
  const { data: productData, isLoading } = useFetchProductsQuery(0)
  const [_, setData] = useState<any>(productData)
  const [removeProduct] = useDeleteFakeProductMutation()
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: productData?.limit
    }
  })
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const response = await fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      const { results } = await response.json()
      setData(results)
      setTableParams((prevParams) => ({
        ...prevParams,
        pagination: {
          ...prevParams.pagination
        }
      }))
    }
    fetchData()
  }, [tableParams])

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
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0
  let data: any[] = []
  if (productData && productData.docs) {
    data = productData.docs.map((item: IProduct) => ({
      key: item._id,
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
  console.log(data)

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

  const columns: ColumnsType<any> = [
    {
      title: 'INDEX',
      dataIndex: 'stt',
      // width: '5%',
      render: (_, __, index) => index + 1,
      className: 'hidden md:table-cell'
    },
    {
      title: 'PRODUCT NAME',
      dataIndex: 'name',
      key: 'name',
      // width: '27%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'IMAGES',
      dataIndex: 'images',
      key: 'images',
      // width: '20%',
      render: (image) => <img className='w-[40px]' src={image} alt='product image' />
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      // width: '25%',
      ...getColumnSearchProps('category')
    },
    {
      title: 'ACTION',
      key: 'action',
      // width: '20%',
      render: (record) => (
        <>
          <Space size='middle' className='hidden md:flex'>
            <Button className='bg-[#d46b08] sm:h-[35px] lg:h-[40px] '>
              <Link style={{ color: 'white', margin: 'auto' }} to={`#`}>
                <AiFillEye className='md:text-[13px]  lg:text-lg' />
              </Link>
            </Button>
            <Button className='bg-[#1d39c4] sm:h-[35px] lg:h-[40px] '>
              <Link style={{ color: 'white', margin: 'auto' }} to={`${record.key}/update`}>
                <AiOutlineEdit className='md:text-[13px] lg:text-lg' />
              </Link>
            </Button>
            <Popconfirm
              title='Delete the product'
              description='Are you sure to delete this product?'
              onConfirm={async () => {
                // await pause(1000)
                await removeProduct(record.key)
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

  return (
    <>
      <div className='grid grid-cols-[4fr,1fr]'>
        <h2 className='font-bold text-[30px]'>All products</h2>
        <Button className='bg-[#1677ff] text-[#ffffff] max-w-[150px] font-bold text-[15px] h-10 hover:bg-blue-300 '>
          + Add product
        </Button>
      </div>
      {isLoading ? (
        // <Skeleton />
        <AtomSpinner color='red' className='mx-auto mt-[10%]'></AtomSpinner>
      ) : (
        <div>
          <div>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
            <Table
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
              onChange={handleTableChange}
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
            <Button onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default List
