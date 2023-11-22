import { Button, Checkbox, Modal, Table, Tooltip } from 'flowbite-react'
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useDeleteImageBannerMutation,
  useGetAllBannersQuery,
  useUploadBannerMutation
} from '../../../api/banner'
import Loading from '../../../components/Loading'
import { HiPlus, HiTrash, HiUpload } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { IBanner } from '../../../interfaces/banner.type'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, MutationDefinition } from '@reduxjs/toolkit/dist/query'

const Banner = () => {
  const { data, isLoading } = useGetAllBannersQuery()
  const [deleteBanner] = useDeleteBannerMutation()
  const [deleteImageBanner, { isLoading: isDeleting }] = useDeleteImageBannerMutation()
  const [ChildChecks, setChildChecks] = useState<{ [key: string]: boolean }>({})
  const [acceptChecked, setAcceptChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    const initialChildChecks: { [key: string]: boolean } = {}
    if (data?.banners) {
      data?.banners.forEach((item) => {
        initialChildChecks[`${item._id}`] = false
      })
    }
    setChildChecks(initialChildChecks)
  }, [data?.banners])
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
  const handleDeleteBanner = (id: string) => {
    Swal.fire({
      title: 'Bạn thực sự muốn xóa?',
      icon: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBanner(id)
          .unwrap()
          .then(({ banner }) => {
            deleteImageBanner(banner.publicId)
            toast.success('Xóa thành công')
          })
          .catch(() => {
            toast.error('Xóa thất bại')
          })
      }
    })
  }
  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <BreadCrumb />
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All Banners</h1>
          </div>
        </div>
        <div className='sm:space-x-3 flex items-center ml-auto space-x-2'>
          <Tooltip content='Thêm banner'>
            <AddBannerModal deleteImageBanner={deleteImageBanner} isDeleting={isDeleting} />
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className='max-h-[600px] overflow-y-scroll hidden-scroll-bar'>
                    <Table className='dark:divide-gray-600 min-h-[600px] min-w-full divide-y divide-gray-200'>
                      <Table.Head className='dark:bg-gray-700 bg-gray-100'>
                        <Table.HeadCell>
                          <Checkbox checked={acceptChecked} onChange={handleAcceptChange} />
                        </Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
                        {data?.banners &&
                          data.banners.map((item) => (
                            <Table.Row key={item._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                              <Table.Cell className='w-4 py-4 px-6'>
                                <Checkbox
                                  id={`${item._id}`}
                                  checked={ChildChecks[`${item._id}`]}
                                  onChange={(e) => handleChildChange(e, `${item._id}`)}
                                />
                              </Table.Cell>
                              <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900'>
                                <img className='w-[500px] max-w-[500px] object-cover' src={item.url} alt='' />
                              </Table.Cell>

                              <Table.Cell>
                                <div className='gap-x-3 whitespace-nowrap flex items-center'>
                                  <Tooltip content='Chỉnh sửa topping'>
                                    {/* <EditToppingModal dataTopping={item} /> */}
                                  </Tooltip>
                                  <Tooltip content='Xóa Banner'>
                                    <Button color='failure' onClick={() => handleDeleteBanner(item._id ?? '')}>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={2}></PaginateNumber>
    </>
  )
}
type AddBannerModalProps = {
  deleteImageBanner: MutationTrigger<
    MutationDefinition<string, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, 'banner', void, 'Banner'>
  >
  isDeleting: boolean
}

const AddBannerModal = ({ deleteImageBanner, isDeleting }: AddBannerModalProps) => {
  const [isOpen, setOpen] = useState(false)
  const [banner, setBanner] = useState([] as IBanner[])
  const [uploadBanner, { isLoading: isUploading }] = useUploadBannerMutation()
  const [addBanner] = useAddBannerMutation()
  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files

    // console.log(event.target.files[0])
    // console.log('file', file)

    const formData = new FormData()
    Array.prototype.forEach.call(fileList, (file) => {
      formData.append('images', file)
      uploadBanner(formData)
        .then(({ data }: any) => {
          // console.log(data)

          const dataBanner = data.urls.map((item: IBanner) => {
            return {
              url: item.url,
              publicId: item.publicId
            }
          })

          setBanner([...banner, ...dataBanner])
        })
        .catch((err) => {
          console.log('upload failed', err)
        })
    })
  }

  const onHandleSubmit = () => {
    banner.forEach((item) => {
      addBanner(item)
        .unwrap()
        .then(() => {
          setOpen(false)

          setBanner([] as IBanner[])
          toast.success('Thêm thành công')
          console.log(banner)
        })
        .catch(() => {
          toast.error('Thêm thất bại')
        })
    })
  }

  const handleDeleteBannerImage = (publicId: string) => {
    deleteImageBanner(publicId)
      .unwrap()
      .then(() => {
        setBanner(banner.filter((item) => item.publicId !== publicId))
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  // console.log('banner', banner)
  // console.log('bannerPreview', banner)

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)} className='w-max'>
        <div className='gap-x-3 flex items-center'>
          <HiPlus className='text-xl' />
          Add Banner
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Add new banner</strong>
        </Modal.Header>
        <form autoComplete='off'>
          <Modal.Body className='h-max max-h-[500px] overflow-y-auto hidden-scroll-bar'>
            <div className='lg:col-span-2 mt-4'>
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
            <div className='flex gap-2 items-center justify-between flex-wrap w-full mt-5  hidden-scroll-bar'>
              {banner.length > 0 &&
                banner.map((item, index: number) => (
                  <div key={index}>
                    <img alt='' src={item.url} className='w-[280px] h-[200px]' />
                    <span className='cursor-pointer' onClick={() => handleDeleteBannerImage(item.publicId)}>
                      <HiTrash className='-mt-5 text-2xl text-red-600' />
                    </span>
                  </div>
                ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={banner.length > 0 && !isUploading && !isDeleting ? false : true}
              color='primary'
              onClick={onHandleSubmit}
            >
              {isUploading || isDeleting ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : 'Add Banner'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default Banner
