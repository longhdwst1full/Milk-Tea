import { Button, Checkbox, Label, Modal, Table, TextInput, Tooltip } from 'flowbite-react'
import { HiDocumentDownload, HiPencil, HiPlus, HiTrash } from 'react-icons/hi'
import { addCate, deleteCate, updateCate } from '../../../store/services/categories'
import { useAppDispatch } from '../../../store/hooks'
import { useEffect, useState } from 'react'

import { CateSchema } from '../../../validate/Form'
import { ICategory } from '../../../interfaces/category.type'
import Swal from 'sweetalert2'
import { exportToExcel } from '../../../utils/excelExport'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
import { useGetAllCategoryQuery } from '../../../api/category'
import Loading from '../../../components/Loading'

const Categories = () => {
  const { data: dataCate, error, isLoading } = useGetAllCategoryQuery()
  const [data, setData] = useState<(string | undefined)[][]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    if (dataCate && Array.isArray(dataCate)) {
      const rows = [...dataCate.map((item) => [item._id, item.name, item.slug, item.createdAt, item.updatedAt])]
      setData([...rows])
    }
  }, [dataCate])
  // console.log(dataCate?.docs)

  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <BreadCrumb />
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All Categories</h1>
          </div>
          <div className='sm:flex'>
            <div className='dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 items-center hidden mb-3'>
              <form className='lg:pr-3'>
                <Label htmlFor='users-search' className='sr-only'>
                  Search
                </Label>
                <div className='lg:w-64 xl:w-96 relative mt-1'>
                  <TextInput id='users-search' name='users-search' placeholder='Search for users' />
                </div>
              </form>
            </div>
            <div className='sm:space-x-3 flex items-center ml-auto space-x-2'>
              <Tooltip content='Thêm danh mục'>
                <AddCategoryModal error={error} />
              </Tooltip>

              <Button color='gray' onClick={() => exportToExcel(data, 'categories')}>
                <div className='gap-x-3 flex items-center'>
                  <HiDocumentDownload className='text-xl' />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <CategoryTable dataCate={dataCate?.docs} error={`${error}`} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      {dataCate?.docs && dataCate?.docs.length === 0 ? (
        ''
      ) : (
        <PaginateNumber
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={dataCate?.totalPages || 0}
        />
      )}
    </>
  )
}

type CategoryTableProps = {
  dataCate: ICategory[] | undefined
  error: string
  isLoading: boolean
}

const CategoryTable = ({ dataCate, error, isLoading }: CategoryTableProps) => {
  console.log(dataCate)
  const dispatch = useAppDispatch()
  const [ChildChecks, setChildChecks] = useState<{ [key: string]: boolean }>({})
  const [acceptChecked, setAcceptChecked] = useState(false)
  useEffect(() => {
    const initialChildChecks: { [key: string]: boolean } = {}
    if (dataCate) {
      dataCate.forEach((item) => {
        initialChildChecks[item._id] = false
      })
    }
    setChildChecks(initialChildChecks)
  }, [dataCate])
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
  // useEffect(() => {
  //   dispatch(getAllCates({ _page: currentPage, _limit: 10 }))
  // }, [dispatch, currentPage])

  const handleDeleteCate = (id: string) => {
    if (!error && id) {
      Swal.fire({
        icon: 'info',
        title: 'Do you want to delete this Category?',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted'
          }).then(() => dispatch(deleteCate(id)))
        }
      })
    } else {
      toast.error('Delete failed!')
    }
  }
  if (isLoading) return <Loading />
  return (
    <>
      <div className='max-h-[500px] overflow-y-scroll hidden-scroll-bar'>
        <Table className='dark:divide-gray-600 min-h-[500px] min-w-full divide-y divide-gray-200'>
          <Table.Head className='dark:bg-gray-700 bg-gray-100'>
            <Table.HeadCell>
              <Checkbox checked={acceptChecked} onChange={handleAcceptChange} />
            </Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            {/* <Table.HeadCell>Slug</Table.HeadCell>
        <Table.HeadCell>Is Deleted</Table.HeadCell> */}
            {/* <Table.HeadCell>Country</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell> */}
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
            {dataCate?.length == 0 ? (
              <>
                <p>Không có dữ liệu</p>
              </>
            ) : (
              dataCate &&
              dataCate.map((item, index: number) => (
                <Table.Row key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <Table.Cell className='w-4 py-4 px-6'>
                    <Checkbox
                      id={`${item._id}`}
                      checked={ChildChecks[item._id]}
                      onChange={(e) => handleChildChange(e, item._id)}
                    />
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap dark:text-white w-full p-4 text-base font-medium text-gray-900'>
                    {item.name}
                  </Table.Cell>
                  {/* <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
                {item.slug}
              </Table.Cell> */}
                  {/* <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
                True
              </Table.Cell> */}

                  <Table.Cell>
                    <div className='gap-x-3 whitespace-nowrap flex items-center'>
                      <Tooltip content='Chỉnh sửa danh mục'>
                        <EditCategoryModal dataCate11={item} error={error} />
                      </Tooltip>

                      <Tooltip content='Xóa danh mục'>
                        <Button color='failure'>
                          <div
                            onClick={() => handleDeleteCate((item?._id as string) && (item._id as string))}
                            className='gap-x-2 flex items-center'
                          >
                            <HiTrash className='text-lg' />
                          </div>
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      {/* {dataCate && dataCate.length === 0 ? (
        ''
      ) : (
        <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={2} />
      )} */}
    </>
  )
}

const AddCategoryModal = function ({ error }: { error: any }) {
  const [isOpen, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<Pick<ICategory, 'name'>>({
    mode: 'onChange',
    resolver: yupResolver(CateSchema)
  })

  const handleSubmitForm = handleSubmit((data: Pick<ICategory, 'name'>) => {
    if (!error && data) {
      dispatch(addCate(data))
      toast.success(`Category ${data.name} added✔`)
      reset()
    } else {
      toast.error('Category size failed!')
    }

    setOpen(false)
    reset()
  })
  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPlus className='text-xl' />
          Add Category
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Add new Category</strong>
        </Modal.Header>
        <Modal.Body>
          <div className='sm:grid-cols-2 grid grid-cols-1 gap-6'>
            <form>
              <Label htmlFor='firstName'>Name Category</Label>
              <div className='mt-1'>
                <TextInput id='firstName' {...register('name')} placeholder='Bonnie' />
                {errors && <span className='text-red-500 text-[13px]'>{errors.name?.message}</span>}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color='primary'
            onClick={() => {
              handleSubmitForm()
            }}
          >
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

interface IPropCate {
  dataCate11: ICategory
  error: string
}
const EditCategoryModal = function ({ dataCate11, error }: IPropCate) {
  const [isOpen, setOpen] = useState(false)

  const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm<Pick<ICategory, 'name'>>({
    mode: 'onChange',
    resolver: yupResolver(CateSchema)
  })

  const handleSubmitForm = handleSubmit((data) => {
    if (data && !error) {
      dispatch(updateCate({ name: data.name, _id: dataCate11._id }))
      toast.success(`Edited ${data.name} Category`)
      reset()
    } else {
      toast.error('Update failed!')
    }
  })

  useEffect(() => {
    setValue('name', dataCate11.name)
  }, [dataCate11.name, setValue])
  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPencil className='text-xl' />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Edit Category</strong>
        </Modal.Header>
        <Modal.Body>
          <div className='sm:grid-cols-2 grid grid-cols-1 gap-6'>
            <form>
              <Label htmlFor='firstName'>Name Category</Label>
              <div className='mt-1'>
                <TextInput {...register('name')} id='firstName' name='name' placeholder='Bonnie' />
                {errors && <span className='text-red-500 text-[13px]'>{errors.name?.message}</span>}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color='primary'
            onClick={() => {
              handleSubmitForm()
            }}
          >
            Edit Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Categories
