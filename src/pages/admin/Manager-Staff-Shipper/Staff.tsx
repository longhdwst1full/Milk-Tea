import { useState } from 'react'
import { useGetAllUsersQuery } from '../../../api/User'
import Loading from '../../../components/Loading'
import { Button, Label, TextInput } from 'flowbite-react'

const Staff = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isLoading } = useGetAllUsersQuery(currentPage)

  if (isLoading) return <Loading />
  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>All Staffs</h1>
          </div>
          <div className='sm:flex'>
            <div className='dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 items-center hidden mb-3'>
              <form className='lg:pr-3'>
                <Label htmlFor='users-search' className='sr-only'>
                  Search
                </Label>
                <div className='flex items-center gap-x-3 mt-1'>
                  <div className='lg:w-64 xl:w-96 relative'>
                    <TextInput id='users-search' name='users-search' type='search' placeholder='Search for users' />
                  </div>
                  <Button color='primary'>Search</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>{/* <RoleTable /> */}</div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </>
  )
}

export default Staff
