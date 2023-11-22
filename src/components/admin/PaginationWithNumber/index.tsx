import React from 'react'
import { Pagination } from 'flowbite-react'
type PaginateNumberProps = {
  currentPage: number
  totalPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const PaginateNumber = ({ currentPage = 1, totalPage = 1, setCurrentPage }: PaginateNumberProps) => {
  return (
    <Pagination
      className='flex justify-end my-2  '
      currentPage={currentPage}
      nextLabel=''
      previousLabel=''
      onPageChange={(page) => {
        setCurrentPage(page)
      }}
      showIcons
      totalPages={totalPage}
    />
  )
}

export default PaginateNumber
