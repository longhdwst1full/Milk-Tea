import { FaAngleDown, FaArrowDown, FaBars } from 'react-icons/fa';
import { IProduct, IProductDocs } from '../../interfaces/products.type';
import { useRef, useState } from 'react';

import { Button } from '..';
import { ICategory } from '../../interfaces/category.type';
import { Link } from 'react-router-dom';
import ListProductItem from '../List-ProductItem';
import PopupDetailProduct from '../PopupDetailProduct';
import http from '../../api/instance';

interface ListProductsProps {
  categoryName: string;
  products?: IProductDocs;
}

const ListProducts = ({ categoryName, products }: ListProductsProps) => {
  const orderRef = useRef<HTMLDivElement>(null);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [product, setProduct] = useState<any>({});

  const handleTogglePopup = () => {
    setIsShowPopup(!isShowPopup);
  };

  const fetchProductById = async (id: string | number) => {
    try {
      const { data } = await http.get(`/product/${id}`);
      setProduct(data.data);
      setIsShowPopup(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const toggleOrder = () => {
    orderRef.current?.classList.toggle('show_order');
  };

  return (
    <>
      <div className="grow rounded-sm">
        <div className="pb-[160px]">
          <div className="category ">
            <div className="category-name flex items-center justify-between px-[20px] py-[16px]">
              <div className="text-lg capitalize select-none">
                {categoryName || 'Tất cả sản phẩm'}
              </div>
              <div className="right">
                <FaAngleDown onClick={() => fetchProductById('64c13cb436e35e0a11545091')} />
              </div>
            </div>
            <div className="list-product xl:mx-0 lg:grid-cols-3 grid grid-cols-2 gap-3">
              {products?.docs &&
                products?.docs?.map((product: IProduct) => (
                  <ListProductItem
                    key={product._id}
                    product={product}
                    fetchProductById={fetchProductById}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="order-bottom bg-[#fff] fixed bottom-0 w-[100vw] flex flex-col border-t border-[#f1f1f1] lg:hidden">
          <div ref={orderRef} className="cart-group-top mb-[70px] ">
            <div className="cart-title flex items-center justify-between p-3 border-b border-[#f1f1f1]">
              <div
                onClick={toggleOrder}
                className="arrow-down border rounded-full w-[21px] h-[21px] flex items-center justify-center border-[#000]"
              >
                <FaArrowDown className="" />
              </div>
              <div className="cart-title-left uppercase"> Giỏ hàng của tôi </div>
              <div className="cart-title-right text-[12px]">Xóa tất cả</div>
            </div>

            <div className="cart-ss1 flex flex-col text-[14px] mx-[15px] my-[10px] py-[8px]">
              {/* Khách hàng chưa thêm sản phẩm */}
              {/* Chưa có sản phẩm nào */}

              {/* Khi thêm sản phẩm */}
              {/* <CardOrder /> */}
            </div>
          </div>

          <div
            onClick={toggleOrder}
            className="cart-group-bottom flex flex-row justify-between items-center  shadow-[0_-2px_5px_0px_rgba(0,0,0,0.06)] cursor-pointer"
          >
            <div className="cart-ss2 flex items-center my-4 px-5 text-[#8a733f] text-[14px]">
              <img className="h-[35px]" src="/icon-glass-tea.png" alt="" />
              <span className="cart-ss2-one px-1">x</span>
              <span className="cart-ss2-two px-1">0</span>
              <span className="cart-ss2-three px-1">=</span>
              <span className="cart-ss2-four px-1">0đ</span>
            </div>
            <div className="cart-ss3">
              {/* <div className="button-cart">Thanh toán</div> */}
              <Link to="checkout">
                <Button size="medium" type="paying" style="mx-[20px]">
                  Thanh toán
                </Button>
              </Link>
            </div>
          </div>

          {/* Category aside responsive */}
          <div className="btn-menu fixed bottom-[100px] left-[16px] bg-[#ee4d2d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer z-[3]">
            <FaBars />
          </div>
        </div>
      </div>
      {product && Object.keys(product).length !== 0 && (
        <PopupDetailProduct
          showPopup={isShowPopup}
          togglePopup={handleTogglePopup}
          product={product}
        />
      )}
    </>
  );
};

export default ListProducts;
