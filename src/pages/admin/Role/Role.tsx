import { Button, Checkbox, Label, Modal, Table, TextInput, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { HiCog, HiDotsVertical, HiExclamationCircle, HiPencil, HiPlus, HiTrash } from 'react-icons/hi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IRole } from '../../../interfaces/role.type'

import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RoleForm, RoleSchema } from '../../../validate/Form'
import { toast } from 'react-toastify'
import Loading from '../../../components/Loading'
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetAllRolesQuery,
  useUpdateRoleMutation
} from '../../../api/role'

const Role = () => {
  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All roles</h1>
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
              <Tooltip content='Thêm vai trò'>
                <AddRoleModal />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <RoleTable />
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </>
  )
}

const RoleTable = () => {
  const { data: roles, isLoading, isError } = useGetAllRolesQuery()
  const [deleteRole, { isLoading: isDeleting, isError: isDeleteErr }] = useDeleteRoleMutation()

  const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to delete this role?',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted'
        }).then(() =>
          deleteRole(id).then(() => {
            if (!isDeleteErr) {
              toast.success('Delete success')
            } else {
              toast.error('Delete failed')
            }
          })
        )
      }
    })
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Loi roi</div>
  return (
    <>
      <Table className='min-w-full min-h-[100vh] divide-y divide-gray-200 dark:divide-gray-600'>
        <Table.Head className='dark:bg-gray-700 bg-gray-100'>
          <Table.HeadCell>
            <Label htmlFor='select-all' className='sr-only'>
              Select all
            </Label>
            <Checkbox id='select-all' name='select-all' />
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className='dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200'>
          {roles &&
            roles.data?.map((item) => (
              <Table.Row key={item._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                <Table.Cell className='w-4 p-4'>
                  <div className='flex items-center'>
                    <Checkbox aria-describedby='checkbox-1' id='checkbox-1' />
                    <label htmlFor='checkbox-1' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                  {item.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900 capitalize'>
                  {item.status}
                </Table.Cell>

                <Table.Cell>
                  <div className='gap-x-3 whitespace-nowrap flex items-center'>
                    <Tooltip content='Chỉnh sửa vai trò'>
                      <EditRoleModal role={item} />
                    </Tooltip>
                    <Tooltip content='Xóa vai trò'>
                      <Button color='failure' onClick={() => handleDelete(item._id!)}>
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
      {/* {idRole && (
        <EditRoleModal isOpen={isEditPopupOpen} togglePopup={togglePopup} idRole={idRole} />
      )} */}
    </>
  )
}

const AddRoleModal = function () {
  const [addRole, { isLoading, isError }] = useAddRoleMutation()
  const [isOpen, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RoleForm>({
    mode: 'onChange',
    resolver: yupResolver(RoleSchema)
  })

  const onHandleSubmit = async (data: any) => {
    await addRole(data)
    if (!isError) {
      toast.success(`Added ${data.name} role`)
      reset()
      setOpen(false)
    }
  }
  return (
    <>
      <Button
        color='primary'
        onClick={() => {
          setOpen(true)
        }}
      >
        <div className='gap-x-3 flex items-center'>
          <HiPlus className='text-xl' />
          Add Role
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
          <strong>Add new role</strong>
        </Modal.Header>
        <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <div className=''>
              <div>
                <Label htmlFor='firstName'>Name Role</Label>
                <div className='mt-1'>
                  <TextInput {...register('name')} placeholder='Name of role' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.name && errors.name.message}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' color='primary'>
              {isLoading ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : 'Add Role'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

type EditRoleModalProps = {
  role: IRole
}
const EditRoleModal = function ({ role }: EditRoleModalProps) {
  const [isOpen, setOpen] = useState(false)
  const [updateRole, { isLoading, isError }] = useUpdateRoleMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RoleForm>({
    mode: 'onChange',
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      ...role
    }
  })

  const onHandleSubmit = async (data: any) => {
    await updateRole(data)
    if (!isError) {
      toast.success(`Updated ${data.name} role`)
      setOpen(false)
    } else {
      toast.error('Update failed')
    }
  }

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        <div className='gap-x-3 flex items-center'>
          <HiPencil className='text-xl' />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className='border-b border-gray-200 !p-6 dark:border-gray-700'>
          <strong>Edit Role</strong>
        </Modal.Header>
        <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <div className=''>
              <div>
                <Label htmlFor='firstName'>Name Role</Label>
                <div className='mt-1'>
                  <TextInput {...register('name')} placeholder='Name of role' />
                </div>
                <span className='block my-2 text-sm text-red-500'>{errors.name && errors.name.message}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' color='primary'>
              {isLoading ? <AiOutlineLoading3Quarters className='rotate text-lg' /> : 'Edit Role'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
export default Role
