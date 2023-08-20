import { ListProducts, MyCart, SidebarCate } from '../../components';
import { getAllCates } from '../../store/services/categories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';

import { RootState } from '../../store/store';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { category, products } = useAppSelector((state: RootState) => state.persistedReducer);
  useEffect(() => {
    dispatch(getAllCates());
  }, []);

  return (
    <div>
      <div className="bg-[#fbfbfb]">
        <div className="container pt-3 mx-auto">
          <div className="content md:flex-row flex flex-col justify-between">
            <SidebarCate categories={category.categories} />
            <ListProducts categoryName={category.nameCate} products={products.products} />
            <MyCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
