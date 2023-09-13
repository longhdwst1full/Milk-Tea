import { Button, Label, Modal, Table, TextInput, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiDocumentDownload, HiOutlinePencilAlt, HiPlus, HiTrash } from 'react-icons/hi'

import Loading from '../../../components/Loading'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { SizeSchema, SizeForm } from '../../../validate/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'
import {
  useCreateSizeMutation,
  useDeleteSizeMutation,
  useGetAllSizeQuery,
  useUpdateSizeMutation
} from '../../../store/slices/size.slice'
import { ISize, ISizeDocs } from '../../../interfaces/size.type'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'

const SizeList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: dataListSize, isLoading, isError } = useGetAllSizeQuery({ page: currentPage, limit: 10 })

  return (
    <section>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <BreadCrumb />
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All Sizes</h1>
          </div>
          <div className='sm:flex'>
            <div className='dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 items-center hidden mb-3'>
              <form className='lg:pr-3'>
                <Label htmlFor='users-search' className='sr-only'>
                  Search
                </Label>
                <div className='lg:w-64 xl:w-96 relative mt-1'>
                  <TextInput id='users-search' name='users-search' placeholder='Search for Sizes' />
                </div>
              </form>
            </div>
            <div className='sm:space-x-3 flex items-center ml-auto space-x-2'>
              <Tooltip content='Thêm Sizes'>
                <AddSizeModal />
              </Tooltip>

              <Button color='gray'>
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
              {dataListSize && <AllSizeListTable dataListSize={dataListSize} isLoading={isLoading} isError={isError} />}
            </div>
          </div>
        </div>
      </div>
      {dataListSize && dataListSize.docs.length > 0 && (
        <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={dataListSize.totalPages} />
      )}
    </section>
  )
}

type AllUsersTableProps = {
  dataListSize: ISizeDocs
  isLoading: boolean
  isError: boolean
}
const AllSizeListTable = function ({ dataListSize, isLoading, isError }: AllUsersTableProps) {
  const [deleteSize] = useDeleteSizeMutation()

  const handleDelete = (id: string) => {
    if (!isError && id) {
      Swal.fire({
        icon: 'info',
        title: 'Do you want to delete this Size?',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted'
          }).then(() => deleteSize(id))
        }
      })
    } else {
      toast.error('Delete failed!')
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Loi roi</div>
  return (
    <div className='max-h-[calc(500px-45px)] overflow-y-scroll hidden-scroll-bar'>
      <Table className='min-w-full  min-h-[500px] divide-y divide-gray-200 dark:divide-gray-600'>
        <Table.Head className='dark:bg-gray-700 bg-gray-100'>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell> Name</Table.HeadCell>
          <Table.HeadCell> Price</Table.HeadCell>

          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
          {dataListSize?.docs &&
            dataListSize.docs.map((size, index) => (
              <Table.Row key={size._id} className={`  hover:bg-gray-100 dark:hover:bg-gray-700`}>
                <Table.Cell className='w-4 p-4'>{index + 1}</Table.Cell>

                <Table.Cell className='whitespace-nowrap dark:text-white w-full p-4 text-base font-medium text-gray-900'>
                  {size.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white w-full p-4 text-base font-medium text-gray-900'>
                  {size.price}
                </Table.Cell>

                <Table.Cell>
                  <div className='gap-x-3 whitespace-nowrap flex items-center'>
                    <Tooltip content='Chỉnh sửa size'>
                      <EditSizeModal size={size} />
                    </Tooltip>
                    <Tooltip content='Xóa size'>
                      <Button
                        color='failure'
                        onClick={() => handleDelete((size?._id as string) && (size._id as string))}
                        className='gap-x-2 flex items-center'
                      >
                        <div className='gap-x-2 flex items-center'>
                          <HiTrash className='text-lg' />
                        </div>
                      </Button>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const AddSizeModal = function () {
  const [isOpen, setOpen] = useState(false)
  const [addSize, { isLoading }] = useCreateSizeMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SizeForm>({
    mode: 'onChange',
    resolver: yupResolver(SizeSchema)
  })
  const onHandleSubmit = (data: SizeForm) => {
    if (data) {
      addSize(data)
        .unwrap()
        .then(() => {
          toast.success('Created size success')
          setOpen(false)

          reset()
        })
        .catch((err) => {
          toast.error(`Create size failed. ${err.data.message}`)
        })
    }
  }

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPlus className='text-xl' />
          Add Size
        </div>
      </Button>
      <Modal
        onClose={() => {
          setOpen(false)
          reset()
        }}
        show={isOpen}
      >
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Add new size</strong>
        </Modal.Header>
        <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <div className='sm:grid-cols-2 grid grid-cols-1 gap-6'>
              <div>
                <Label htmlFor='firstName'>Name</Label>
                <div className='mt-1'>
                  <TextInput {...register('name')} id='firstName' placeholder='M,XL..' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.name && errors.name.message}</span>
              </div>

              <div>
                <Label htmlFor='account'>Price</Label>
                <div className='mt-1'>
                  <TextInput {...register('price')} id='account' placeholder='0' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.price && errors.price.message}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color='primary' type='submit'>
              {isLoading ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : ' Add Size'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

type EditSizeModalProps = {
  size: ISize
}
const EditSizeModal = function ({ size }: EditSizeModalProps) {
  const [isOpen, setOpen] = useState(false)

  const [updateSizeFn] = useUpdateSizeMutation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<SizeForm>({
    mode: 'onChange',
    resolver: yupResolver(SizeSchema)
  })

  const onHandleSubmit = handleSubmit((data: SizeForm) => {
    console.log(data)
    if (data) {
      updateSizeFn({ data: data, _id: size?._id as string })
        .unwrap()
        .then(() => {
          toast.success('Update size success')
          setOpen(false)
          reset()
        })
        .catch((err) => {
          toast.error(`Update size failed. ${err.data.message}`)
        })
    }
  })
  useEffect(() => {
    if (size) {
      setValue('name', size.name)
      setValue('price', size.price)
    }
  }, [setValue, size, size.name, size.price])
  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-2 flex items-center'>
          <HiOutlinePencilAlt className='text-lg' />
        </div>
      </Button>
      <Modal
        onClose={() => {
          setOpen(false)
          reset()
        }}
        show={isOpen}
      >
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Edit Size</strong>
        </Modal.Header>
        <form action='' onSubmit={() => onHandleSubmit()}>
          <Modal.Body>
            <div className='sm:grid-cols-2 grid grid-cols-1 gap-6'>
              <div>
                <Label htmlFor='username'>Name</Label>
                <div className='mt-1'>
                  <TextInput id='username' {...register('name')} placeholder='Bonnie' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.name && errors.name.message}</span>
              </div>
              <div>
                <Label htmlFor='account'>Price</Label>
                <div className='mt-1'>
                  <TextInput id='account' {...register('price')} placeholder='Your price' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.price && errors.price.message}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color='primary' onClick={() => onHandleSubmit()}>
              Edit Size
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default SizeList
