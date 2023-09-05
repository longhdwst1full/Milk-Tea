import { Button } from 'flowbite-react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

type PaginationProps = {
  nextPage: () => void
  prevPage: () => void
  hasPrev: boolean
  hasNext: boolean
  totalDocs?: number
}

const Pagination = ({ nextPage, prevPage, hasNext, hasPrev, totalDocs }: PaginationProps) => {
  return (
    <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200'>
      <div className='sm:mb-0 flex items-center mb-4'>
        <Button
          disabled={!hasPrev}
          onClick={prevPage}
          className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer'
        >
          <span className='sr-only'>Previous page</span>
          <HiChevronLeft className='text-2xl' />
        </Button>
        <Button
          disabled={!hasNext}
          onClick={nextPage}
          className='hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer'
        >
          <span className='sr-only'>Next page</span>
          <HiChevronRight className='text-2xl' />
        </Button>
        <span className='dark:text-gray-400 text-sm font-normal text-gray-500'>
          Showing&nbsp;
          <span className='dark:text-white font-semibold text-gray-900'>10</span>
          &nbsp;of&nbsp;
          <span className='dark:text-white font-semibold text-gray-900'>{totalDocs}</span>
        </span>
      </div>
      <div className='flex items-center space-x-3'>
        <Button
          disabled={!hasPrev}
          onClick={prevPage}
          className='bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center flex-1 px-3 text-sm font-medium text-center text-white rounded-lg select-none'
        >
          <HiChevronLeft className='mr-1 text-base' />
          Previous
        </Button>
        <Button
          disabled={!hasNext}
          onClick={nextPage}
          className='bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center flex-1 px-3 text-sm font-medium text-center text-white rounded-lg select-none'
        >
          Next
          <HiChevronRight className='ml-1 text-base' />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
