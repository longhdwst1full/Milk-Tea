import { Input } from '..'
import { useEffect, useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import { getAllProducts } from '../../store/services/product.service'
import { useAppDispatch } from '../../store/hooks'
import { useSelector } from 'react-redux'
import useDeBounce from '../../hook/userDeBounce'

const Header = () => {
  const [value, setValue] = useState('')
  const iDcategory = useSelector((state: RootState) => state.persistedReducer.category.idCate)
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.persistedReducer.auth)
  const { page, valueSearch } = useSelector((state: RootState) => state.persistedReducer.products)
  const debouncedSearchValue = useDeBounce(value, 1000, valueSearch)

  useEffect(() => {
    dispatch(
      getAllProducts({
        page: page,
        limit: 10,
        query: debouncedSearchValue || valueSearch,
        category: iDcategory
      })
    )
  }, [debouncedSearchValue, iDcategory, page])

  return (
    <div className='header flex items-center justify-between gap-2 px-4 py-2'>
      <div className='logo lg:block hidden'>
        <Link to={'/'}>
          <img src='/logo_removebg.png' alt='' className='object-cover w-10 h-10' />
        </Link>
      </div>
      <div className='search lg:flex items-center justify-center w-full'>
        <Input
          prefix={<AiOutlineSearch className='text-xl ml-2 text-[#bebec2] absolute' />}
          type='search'
          placeholder='Tìm kiếm sản phẩm...'
          setText={setValue}
          searchValue={value || valueSearch}
        />
      </div>
      {user?.avatar ? (
        <div>
          <Link to='/account-layout'>
            <img className='w-9 h-9 rounded-full mr-[8px] object-cover' src={user?.avatar} alt='' />
          </Link>
        </div>
      ) : (
        <div className='text-sm px-[15px] py-[6px] bg-[#d8b979] text-white text-center rounded-3xl'>
          <Link to='/signin' className='w-max block'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
