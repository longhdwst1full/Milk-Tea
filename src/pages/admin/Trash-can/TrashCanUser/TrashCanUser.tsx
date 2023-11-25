import { AiFillEye, AiOutlineSearch } from 'react-icons/ai'
import { Button, Input, Space, Table, Select, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useMemo, useRef, useState } from 'react'
import type { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import './TrashCanUser.module.css'
import { GrPowerReset } from 'react-icons/gr'
import { useGetAllUsersQuery, useIsAtiveUserMutation } from '../../../../api/User'
import { IUser } from '../../../../interfaces/user.type'
import { pause } from '../../../../utils/pause'
import Loading from '../../../../components/Loading'

interface DataType {
  key: string
  avatar: string
  name: string
  role: string
}
type DataIndex = keyof DataType
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue | null>
}
const TrashCanUser = () => {
  const { data: userList, isLoading } = useGetAllUsersQuery(0)
  const [isAtiveUserFN, isAtiveUserRes] = useIsAtiveUserMutation()
  const dataListUser: IUser[] = useMemo(
    () => (userList ? userList.docs.filter((item) => item.role === 'inactive') : []),
    [userList]
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useState<IUser[]>(dataListUser ?? [])
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: userList?.limit
    }
  })

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
  let data: DataType[] = []
  if (dataListUser) {
    data = dataListUser.map((item: IUser) => ({
      key: item._id ?? '',
      name: item.account ?? '',
      // account: item.account,
      avatar: item.avatar ?? '',
      role: item.role
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
      title: 'User NAME',
      dataIndex: 'name',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      key: 'name',
      // width: '27%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'IMAGES',
      dataIndex: 'avatar',
      key: 'avatar',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      // width: '20%',
      render: (avatar) => <img className='w-[70px]' src={avatar} alt='user image' />
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      className: 'dark:bg-gray-900 dark:text-[#ffffff]',
      // width: '20%',
      ...getColumnSearchProps('role')
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
            {/* <Popconfirm
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
            </Popconfirm> */}
          </Space>
          <div className='text-right inline-block md:hidden lg:hidden'>
            <GiHamburgerMenu />
          </div>
        </>
      )
    }
  ]

  const OPTIONS = ['Cà phê', 'Sữa chua dẻo', 'Trà sữa', '	Macchiato Cream Cheese']
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleProductAll = (type: string) => {
    selectedRowKeys.length > 0 &&
      selectedRowKeys.forEach((item) => {
        if (type == 'inactive') {
          isAtiveUserFN({ id: item as string, isStatus: 'inactive' })
        }
        if (type == 'active') {
          isAtiveUserFN({ id: item as string, isStatus: 'active' })
        }
      })
  }
  return (
    <div className='dark:text-[#ffffff] dark:bg-gray-900'>
      <h1 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-3 '>Đã xóa gần đây</h1>
      <div className='flex'>
        <h2 className='text-[15px]'>Tìm theo danh mục:</h2>
        <Select
          className='w-full max-w-[250px] ml-[20px] custom-select'
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
          {/* <Button
            disabled={isAtiveUserRes.isLoading ||  selectedRowKeys.length < 1}
            className='sm:h-[35px] lg:h-[40px] bg-green-500 text-[#ffffff] md:text-[13px] lg:text-lg hover:text-gray-200 mr-2 '
            onClick={() => handleProductAll('active')}
          >
            Khôi phục All
          </Button> */}
          <Button
            disabled={isAtiveUserRes.isLoading || selectedRowKeys.length < 1}
            className='bg-[#f5222d] sm:h-[35px] lg:h-[40px] text-[#ffffff] md:text-[13px] lg:text-lg  '
          >
            <Popconfirm
              title='Bạn có chắc muốn Active account?'
              // description='Khi thực hiện, bạn sẽ không thể khôi phục sản phẩm này!'
              onConfirm={async () => {
                await pause(1000)
                handleProductAll('inactive')
                message.success('Active account thành công')
              }}
              okText='Yes'
              okButtonProps={{
                style: { backgroundColor: 'blue' }
              }}
              cancelText='No'
            >
              Khôi phục All
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
                pageSize: userList?.limit,
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

export default TrashCanUser
