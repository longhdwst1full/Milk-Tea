import { Button, Checkbox, Label, Modal, Table, TextInput, Textarea, Tooltip } from 'flowbite-react'
import { HiDocumentDownload, HiPencil, HiPlus, HiTrash, HiUpload } from 'react-icons/hi'
import { useEffect, useState } from 'react'

import { BlogsForm, BlogsSchema } from '../../../validate/Form'
import Swal from 'sweetalert2'
import { exportToExcel } from '../../../utils/excelExport'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
import {
  useAddBlogsMutation,
  useDeleteBlogsMutation,
  useGetAllBlogsQuery,
  useUpdateBlogsMutation
} from '../../../api/NewBlogs'
import { IBlogs } from '../../../interfaces/Blogs.type'
import Loading from '../../../components/Loading'

const Blogs = () => {
  const { data: dataBlogs, error, isLoading } = useGetAllBlogsQuery()
  console.log(dataBlogs?.docs)

  const [data, setData] = useState<(string | undefined)[][]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    if (dataBlogs && Array.isArray(dataBlogs)) {
      const rows = [...dataBlogs.map((item) => [item._id, item.name, item.slug, item.createdAt, item.updatedAt])]
      setData([...rows])
    }
  }, [dataBlogs])
  // console.log(dataBlogs?.docs)

  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <BreadCrumb />
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All Blogs</h1>
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
              <Tooltip content='Thêm bài viết'>
                <AddBlogsModal error={`${error}`} />
              </Tooltip>

              <Button color='gray' onClick={() => exportToExcel(data, 'blogs')}>
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
              <BlogsTable dataBlogs={dataBlogs?.docs} error={`${error}`} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      {dataBlogs?.docs && dataBlogs?.docs.length == 0 ? (
        ''
      ) : (
        <PaginateNumber
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={dataBlogs?.totalPages || 0}
        />
      )}
    </>
  )
}

type BlogsTableProps = {
  dataBlogs: IBlogs[] | undefined
  error: string
  isLoading: boolean
}

const BlogsTable = ({ dataBlogs, error, isLoading }: BlogsTableProps) => {
  //   console.log(dataBlogs)
  //   const dispatch = useAppDispatch()
  const [deleteBlog] = useDeleteBlogsMutation()
  const [ChildChecks, setChildChecks] = useState<{ [key: string]: boolean }>({})
  const [acceptChecked, setAcceptChecked] = useState(false)
  useEffect(() => {
    const initialChildChecks: { [key: string]: boolean } = {}
    if (dataBlogs) {
      dataBlogs.forEach((item) => {
        initialChildChecks[item._id] = false
      })
    }
    setChildChecks(initialChildChecks)
  }, [dataBlogs])
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

  const handleDeleteBlog = (_id: string) => {
    console.log(error)
    if (!error || ('undefined' && _id)) {
      Swal.fire({
        icon: 'info',
        title: 'Bạn có muốn xóa bài viết này ?',
        showCancelButton: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Xóa thành công'
          }).then(() => deleteBlog(_id))
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
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            {/* <Table.HeadCell>Country</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell> */}
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
            {dataBlogs?.length == 0 ? (
              <>
                <p>Không có dữ liệu</p>
              </>
            ) : (
              dataBlogs &&
              dataBlogs.map((blog) => (
                <Table.Row key={blog._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <Table.Cell className='w-4 py-4 px-6'>
                    <Checkbox
                      id={`${blog._id}`}
                      checked={ChildChecks[blog._id]}
                      onChange={(e) => handleChildChange(e, blog._id)}
                    />
                  </Table.Cell>
                  <Table.Cell className=' dark:text-white w-full max-w-[30%]  text-base font-medium text-gray-900'>
                    {blog.name}
                  </Table.Cell>
                  <Table.Cell className=' w-full max-w-[20%] dark:text-white  text-base font-medium text-gray-900'>
                    <img src={blog.images[0].url} alt='blogs' className='w-full' />
                  </Table.Cell>
                  <Table.Cell className=' dark:text-white w-full max-w-[40%]  text-base font-medium text-gray-900'>
                    {blog.description.length > 100 ? blog.description.slice(0, 100) + '...' : blog.description}
                  </Table.Cell>

                  <Table.Cell>
                    <div className='gap-x-3 whitespace-nowrap flex items-center'>
                      <Tooltip content='Chỉnh sửa bài viết'>
                        <EditBlogsModal dataBlogs11={blog} error={error} />
                      </Tooltip>

                      <Tooltip content='Xóa bài viết'>
                        <Button color='failure'>
                          <div onClick={() => handleDeleteBlog(blog._id)} className='gap-x-2 flex items-center'>
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
      {/* {dataBlogs && dataBlogs.length === 0 ? (
        ''
      ) : (
        <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={2} />
      )} */}
    </>
  )
}

const AddBlogsModal = function ({ error }: { error: string }) {
  const [isOpen, setOpen] = useState(false)
  const [addBlog] = useAddBlogsMutation()
  // const dispatch = useAppDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<BlogsForm>({
    mode: 'onChange',
    resolver: yupResolver(BlogsSchema)
  })

  const handleSubmitForm = handleSubmit((data: any) => {
    if (!error && data) {
      addBlog({ ...data, images: data.images || '' })
      toast.success(`Thêm bài viết thành công`)
      reset()
    } else {
      toast.error('Blog add failed!')
      console.log(error)
    }

    setOpen(false)
    reset()
  })
  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    console.log(file)
  }

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPlus className='text-xl' />
          Add Blog
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Add new Blog</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='sm:grid-cols-1 grid grid-cols-1 gap-6'>
              <div>
                <Label htmlFor='firstName'>Name Blog</Label>
                <div className='mt-1'>
                  <TextInput id='firstName' {...register('name')} placeholder='Title blog' />
                  {errors && <span className='text-red-500 text-[13px]'>{errors.name?.message}</span>}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor='firstName'>Description</Label>
              <div className='mt-1'>
                <Textarea id='firstName' {...register('description')} placeholder='Description blog' rows={6} />
                {errors && <span className='text-red-500 text-[13px]'>{errors.name?.message}</span>}
              </div>
            </div>
            <div className='lg:col-span-2'>
              <Label htmlFor='firstName'>Image</Label>
              <div className='flex items-center justify-center w-full'>
                <label className='h-28 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700 flex flex-col w-full border-2 border-gray-300 border-dashed rounded cursor-pointer'>
                  <div className='flex flex-col items-center justify-center h-full pt-5 pb-6'>
                    <HiUpload className='text-4xl text-gray-300' />
                    <p className='dark:text-gray-500 py-1 text-sm text-gray-600'>Upload a file or drag and drop</p>
                    <p className='dark:text-gray-400 text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input type='file' multiple hidden onChange={(e) => handleUploadChange(e)} />
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color='primary'
            onClick={() => {
              handleSubmitForm()
            }}
          >
            Add Blog
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

interface IPropBlog {
  dataBlogs11: IBlogs
  error: string
}
const EditBlogsModal = function ({ dataBlogs11 }: IPropBlog) {
  const [isOpen, setOpen] = useState(false)
  const [updateBlog] = useUpdateBlogsMutation()
  // const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
    // reset
  } = useForm<BlogsForm>({
    mode: 'onChange',
    resolver: yupResolver(BlogsSchema),
    defaultValues: {
      ...dataBlogs11
    } as any
  })

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      const response = await updateBlog({
        _id: dataBlogs11._id,
        name: data.name,
        description: data.description,
        images: dataBlogs11.images
      })
      if (response) {
        toast.success('Cập nhật blog thành công')
        setOpen(false)
      } else {
        toast.error('Cập nhật thất bại')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      toast.error('Update failed!')
    }
  })

  useEffect(() => {
    setValue('name', dataBlogs11.name)
  }, [dataBlogs11.name, setValue])
  // console.log(dataBlogs11.name)

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPencil className='text-xl' />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Edit Blog</strong>
        </Modal.Header>
        <Modal.Body>
          <div className='sm:grid-cols-1 grid grid-cols-1 gap-6'>
            <form>
              <div>
                <Label htmlFor='firstName'>Name Blog</Label>
                <div className='mt-1'>
                  <TextInput {...register('name')} id='firstName' name='name' placeholder='Tiêu đề bài viết' />
                  {errors && <span className='text-red-500 text-[13px]'>{errors.name?.message}</span>}
                </div>
              </div>
              <div>
                <Label htmlFor='description'>Description Blog</Label>
                <div className='mt-1'>
                  <Textarea
                    {...register('description')}
                    id='description'
                    name='description'
                    placeholder='Mô tả bài viết'
                    rows={6}
                  />
                  {errors && <span className='text-red-500 text-[13px]'>{errors.name?.message}</span>}
                </div>
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
            Edit Blog
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Blogs
