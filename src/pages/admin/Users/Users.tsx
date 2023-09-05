import { Breadcrumb, Button, Checkbox, Label, Modal, Select, Table, TextInput, Tooltip } from 'flowbite-react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash
} from 'react-icons/hi'
import {
  useAddUserMutation,
  useDeleteImageUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpLoadAvartaUserMutation,
  useUpdateUserMutation
} from '../../../api/User'
import Loading from '../../../components/Loading'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { IUser, IUserDocs } from '../../../interfaces/user.type'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { AddUserForm, AddUserSchema, UpdateUserForm, UpdateUserSchema } from '../../../validate/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetAllRolesQuery } from '../../../api/role'
import { useAppSelector } from '../../../store/hooks'
import UserUpload from '../../../components/Upload/UserUpload'
import { IImage } from '../../../interfaces/image.type'
import PaginateNumber from '../../../components/admin/PaginationWithNumber'

const UserList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: users, isLoading, isError } = useGetAllUsersQuery(currentPage)

  return (
    <section>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <Breadcrumb className='mb-4'>
              <Breadcrumb.Item href='#'>
                <div className='gap-x-3 flex items-center'>
                  <HiHome className='text-xl' />
                  <span className='dark:text-white'>Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href='/users/list'>Users</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All users</h1>
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
              <div className='sm:mt-0 sm:pl-2 flex pl-0 mt-3 space-x-1'>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Configure</span>
                  <HiCog className='text-2xl' />
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Delete</span>
                  <HiTrash className='text-2xl' />
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Purge</span>
                  <HiExclamationCircle className='text-2xl' />
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
                >
                  <span className='sr-only'>Settings</span>
                  <HiDotsVertical className='text-2xl' />
                </a>
              </div>
            </div>
            <div className='sm:space-x-3 flex items-center ml-auto space-x-2'>
              <Tooltip content='Thêm người dùng'>
                <AddUserModal />
              </Tooltip>
              {/* <Button color="primary">
                <div className="gap-x-3 flex items-center">
                  <HiPlus className="text-xl" />
                  Add user
                </div>
              </Button> */}
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
              {users && <AllUsersTable users={users} isLoading={isLoading} isError={isError} />}
            </div>
          </div>
        </div>
      </div>
      {users && users.docs.length > 0 && (
        <PaginateNumber currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={users.totalPages} />
      )}
    </section>
  )
}

type AllUsersTableProps = {
  users: IUserDocs
  isLoading: boolean
  isError: boolean
}
const AllUsersTable = function ({ users, isLoading, isError }: AllUsersTableProps) {
  const [deleteUser, { isLoading: isDeleting, isError: isDeleteErr }] = useDeleteUserMutation()
  const { user: currentUser } = useAppSelector((state) => state.persistedReducer.auth)

  const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to delete this user?',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentUser._id === id) {
          Swal.fire({
            icon: 'error',
            title: "Can't delete yourself!"
          })
        } else {
          deleteUser(id).then(() => {
            if (!isDeleteErr) {
              toast.success('Deleted success')
            } else {
              toast.error('Delete failed')
            }
          })
        }
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Everything is safe'
        })
      }
    })
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Loi roi</div>
  return (
    <Table className='min-w-full  divide-y divide-gray-200 dark:divide-gray-600'>
      <Table.Head className='dark:bg-gray-700 bg-gray-100'>
        <Table.HeadCell>
          <Label htmlFor='select-all' className='sr-only'>
            Select all
          </Label>
          <Checkbox id='select-all' name='select-all' />
        </Table.HeadCell>
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Position</Table.HeadCell>
        <Table.HeadCell>Deleted</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
        {users?.docs &&
          users?.docs.map((user) => (
            <Table.Row
              key={user._id}
              className={`  hover:bg-gray-100 dark:hover:bg-gray-700 ${
                currentUser._id === user._id
                  ? 'bg-green-300 dark:bg-green-600 dark:hover:bg-green-500 hover:bg-green-200 '
                  : ''
              }`}
            >
              <Table.Cell className='w-4 p-4'>
                <div className='flex items-center'>
                  <Checkbox aria-describedby='checkbox-1' id='checkbox-1' />
                  <label htmlFor='checkbox-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </Table.Cell>
              <Table.Cell className='whitespace-nowrap lg:mr-0 flex items-center p-4 mr-12 space-x-6'>
                <img
                  className='w-10 h-10 rounded-full'
                  src={user.avatar || `https://api.multiavatar.com/${user.username}.png`}
                  alt={user.username}
                />
                <div className='dark:text-gray-400 text-sm font-normal text-gray-500'>
                  <div className='dark:text-white text-base font-semibold text-gray-900'>{user.username}</div>
                  <div className='dark:text-gray-400 text-sm font-normal text-gray-500'>
                    {user?.account || user?.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                {user.address ? user.address : 'Unknow'}
              </Table.Cell>
              <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                {user?.role?.name}
              </Table.Cell>
              <Table.Cell className='whitespace-nowrap dark:text-white  p-4 text-base font-medium text-white capitalize'>
                <span
                  className={`${user?.deleted === true ? 'bg-red-400 ' : 'bg-green-400 '} rounded inline-block px-2`}
                >
                  {user?.deleted === true ? 'true' : 'false'}
                </span>
              </Table.Cell>
              <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-normal text-gray-900'>
                <div className='flex items-center capitalize'>
                  <div
                    className={`mr-2 h-2.5 w-2.5 rounded-full  ${
                      user?.role?.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  ></div>
                  {user?.role?.status || 'Not Active'}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className='gap-x-3 whitespace-nowrap flex items-center'>
                  <Tooltip content='Chỉnh sửa người dùng'>
                    <EditUserModal user={user} />
                  </Tooltip>
                  <Tooltip content='Xóa người dùng'>
                    <Button color='failure' onClick={() => handleDelete(user._id!)}>
                      <div className='gap-x-2 flex items-center'>
                        {isDeleting ? (
                          <AiOutlineLoading3Quarters className='rotate text-lg' />
                        ) : (
                          <HiTrash className='text-lg' />
                        )}
                      </div>
                    </Button>
                  </Tooltip>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  )
}

const AddUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false)
  const [urlAvatar, setUrlAvatar] = useState({} as IImage)
  const [addUser, { isLoading }] = useAddUserMutation()
  const [upLoadAvartaUser, { isLoading: isUpLoading }] = useUpLoadAvartaUserMutation()
  const [deleteImageUser, { isLoading: isDeleting }] = useDeleteImageUserMutation()
  const { data: roles } = useGetAllRolesQuery()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddUserForm>({
    // mode: 'onChange',
    resolver: yupResolver(AddUserSchema)
  })
  const onHandleSubmit = (data: any) => {
    if (data) {
      addUser({ ...data, avatar: urlAvatar.url })
        .unwrap()
        .then(() => {
          toast.success('Created user success')
          setOpen(false)
          setUrlAvatar({} as IImage)
          reset()
        })
        .catch((err: any) => {
          toast.error(`Create user failed. ${err.data.message}`)
        })
    }
  }
  // const handleChangeUpload = (event: any) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('images', file);
  //   upLoadAvartaUser(formData)
  //     .then(({ data }: any) => {
  //       toast.success('Uploaded avatar');
  //       setUrlAvatar(data.urls[0]);
  //     })
  //     .catch((err) => {
  //       toast.error('Upload failed');
  //     });
  // };

  // const handleDeleteUserImage = (id: string) => {
  //   deleteImageUser(id)
  //     .then(() => {
  //       setUrlAvatar({} as { publicId: string; url: string; filename: string });
  //       toast.success('Delete success');
  //     })
  //     .catch((err) => toast.error(`Delete failed ${err.message}`));
  // };
  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPlus className='text-xl' />
          Add user
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
          <strong>Add new user</strong>
        </Modal.Header>
        <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body className='h-[500px]'>
            <div className='sm:grid-cols-2 grid grid-cols-1 gap-6'>
              <div>
                <Label htmlFor='firstName'>Username</Label>
                <div className='mt-1'>
                  <TextInput {...register('username')} id='firstName' placeholder='Bonnie' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.username && errors.username.message}</span>
              </div>
              <div>
                <Label htmlFor='address'>Address</Label>
                <div className='mt-1'>
                  <TextInput {...register('address')} id='address' placeholder='Your address' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.address && errors.address.message}</span>
              </div>
              <div>
                <Label htmlFor='account'>Account</Label>
                <div className='mt-1'>
                  <TextInput {...register('account')} id='account' placeholder='Your email or phone number' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.account && errors.account.message}</span>
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <div className='mt-1'>
                  <TextInput {...register('password')} id='password' placeholder='******' type='text' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.password && errors.password.message}</span>
              </div>

              <div>
                <Label htmlFor='department'>Role</Label>
                <div className='mt-1'>
                  <Select {...register('role')}>
                    {roles &&
                      roles.data.length > 0 &&
                      roles.data.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                  </Select>
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.role && errors.role.message}</span>
              </div>

              <UserUpload
                urlAvatar={urlAvatar}
                setUrlAvatar={setUrlAvatar}
                upLoadAvartaUser={upLoadAvartaUser}
                deleteImageUser={deleteImageUser}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isUpLoading || isDeleting} color='primary' type='submit'>
              {isLoading || isUpLoading || isDeleting ? (
                <AiOutlineLoading3Quarters className='rotate text-lg' />
              ) : (
                ' Add user'
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

type EditUserModalProps = {
  user: IUser
}
const EditUserModal = function ({ user }: EditUserModalProps) {
  const [isOpen, setOpen] = useState(false)
  const { data: roles } = useGetAllRolesQuery()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [upLoadAvartaUser, { isLoading: isUploading }] = useUpLoadAvartaUserMutation()
  const [deleteImageUser, { isLoading: isDeleting }] = useDeleteImageUserMutation()
  const [urlAvatar, setUrlAvatar] = useState({} as IImage)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateUserForm>({
    mode: 'onChange',
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: { ...user, role: user.role?._id, address: user.address || '' } as any
  })

  const onHandleSubmit = (data: any) => {
    updateUser({ ...data, avatar: urlAvatar.url })
      .unwrap()
      .then(() => {
        toast.success('Update user success')
        setOpen(false)
      })
      .catch(() => {
        toast.error('Update user failed.')
      })
  }
  useEffect(() => {
    setUrlAvatar({ ...urlAvatar, url: user.avatar })
  }, [])
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
          <strong>Edit user</strong>
        </Modal.Header>
        <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <div className='sm:grid-cols-2 grid grid-cols-1 gap-6'>
              <div>
                <Label htmlFor='username'>Username</Label>
                <div className='mt-1'>
                  <TextInput id='username' {...register('username')} placeholder='Bonnie' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.username && errors.username.message}</span>
              </div>
              <div>
                <Label htmlFor='account'>Address</Label>
                <div className='mt-1'>
                  <TextInput id='account' {...register('address')} placeholder='Your address' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.address && errors.address.message}</span>
              </div>
              <div>
                <Label htmlFor='account'>Account</Label>
                <div className='mt-1'>
                  <TextInput readOnly id='account' {...register('account')} placeholder='Your email or phone number' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.account && errors.account.message}</span>
              </div>
              {/* <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                  <TextInput {...register('password')} placeholder="*******" type="password" />
                </div>
                <span className="block my-2 text-sm text-red-500">
                  {errors.password && errors.password.message}
                </span>
              </div> */}

              <div>
                <Label htmlFor='Role'>Role</Label>
                <div className='mt-1'>
                  <Select {...register('role')}>
                    {roles &&
                      roles.data.length > 0 &&
                      roles.data.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                  </Select>
                  {/* <TextInput name="company" placeholder="Somewhere" /> */}
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.role && errors.role.message}</span>
              </div>

              <UserUpload
                urlAvatar={urlAvatar}
                setUrlAvatar={setUrlAvatar}
                upLoadAvartaUser={upLoadAvartaUser}
                deleteImageUser={deleteImageUser}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isUploading || isDeleting} color='primary' type='submit'>
              {isLoading || isUploading || isDeleting ? (
                <AiOutlineLoading3Quarters className='rotate text-lg' />
              ) : (
                'Edit user'
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default UserList
