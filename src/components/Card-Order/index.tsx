import { AiOutlineLine, AiOutlinePlus } from 'react-icons/ai';
import { decreamentQuantity, increamentQuantity } from '../../store/slices/cart.slice';

import { CartLists } from '../../store/slices/types/cart.type';
import { formatCurrency } from '../../utils/formatCurrency';
import { useAppDispatch } from '../../store/hooks';
import { v4 as uuidv4 } from 'uuid';

type CardOrderProps = {
  product: CartLists;
};

const CardOrder = ({ product }: CardOrderProps) => {
  console.log('🚀 ~ file: index.tsx:14 ~ CardOrder ~ product:', product);
  const dispatch = useAppDispatch();
  return (
    <div className="card flex justify-between items-center border border-transparent border-b-[#f1f1f1] tracking-tight ">
      <div className="py-3">
        <div className="name ">{product?.name}</div>
        {product?.items?.length > 0 &&
          product?.items?.map((item, index) => (
            <div className="flex items-center gap-1" key={uuidv4()}>
              <div>
                <p className="text-sm text-[#adaeae] truncate">{item.size.name}</p>
                <div className="customize text-[#adaeae] truncate w-[182px]" key={uuidv4()}>
                  <span className="overflow-hidden truncate">
                    {item.toppings?.map((topping) => topping.name).join(', ')}
                  </span>
                </div>
                <div className="total text-[#8a733f]">
                  {formatCurrency(item.total)} x {item.quantity}
                </div>
              </div>
              <div className="flex select-none">
                <div
                  className="quantity w-[20px] cursor-pointer h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center"
                  onClick={() =>
                    dispatch(
                      decreamentQuantity({
                        index,
                        name: product.name,
                        quantity: item.quantity,
                        size: item.size,
                        toppings: item.toppings,
                        product: item.product,
                      })
                    )
                  }
                >
                  <AiOutlineLine className="" />
                </div>
                <div className="amount mx-2">{item.quantity}</div>
                <div
                  className="quantity w-[20px] cursor-pointer h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center"
                  onClick={() =>
                    dispatch(
                      increamentQuantity({
                        index,
                        name: product.name,
                        quantity: item.quantity,
                        size: item.size,
                        toppings: item.toppings,
                        product: item.product,
                      })
                    )
                  }
                >
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardOrder;
