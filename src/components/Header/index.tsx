import { Button, Input } from '..';
import React, { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { getAllProducts } from '../../store/services/product.service';
import { useAppDispatch } from '../../store/hooks';
import { useSelector } from 'react-redux';
import useDeBounce from '../../hook/userDeBounce';

const Header = () => {
  const [value, setValue] = useState('');
  const iDcategory = useSelector((state: RootState) => state.persistedReducer.category.idCate);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.persistedReducer.auth);
  const debouncedSearchValue = useDeBounce(value, 1000);

  useEffect(() => {
    dispatch(
      getAllProducts({ page: 1, limit: 20, query: debouncedSearchValue, category: iDcategory })
    );
  }, [debouncedSearchValue, iDcategory]);

  return (
    <div className="header flex justify-between items-center px-4 py-2 gap-2">
      <div className="logo hidden lg:block">
        <Link to={'/'}>
          <img src="/logo_removebg.png" alt="" className="w-10 h-10 object-cover" />
        </Link>
      </div>
      <div className="search w-full lg:flex items-center justify-center">
        <Input
          prefix={<AiOutlineSearch className="text-xl ml-2 text-[#bebec2] absolute" />}
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          setText={setValue}
          searchValue={value}
        />
      </div>
      {user?.avatar ? (
        <div>
          <Link to="/account-layout">
            <img className="w-9 h-9 rounded-full mr-[8px] object-cover" src={user?.avatar} alt="" />
          </Link>
        </div>
      ) : (
        <div className="text-sm px-[15px] py-[6px] bg-[#d8b979] text-white text-center rounded-3xl">
          <Link to="/signin" className="block w-max">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
