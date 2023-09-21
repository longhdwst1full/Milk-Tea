import { AiOutlineLine, AiOutlinePlus } from 'react-icons/ai'
import { CartItemState, CartLists } from '../../store/slices/types/cart.type'
import { decreamentQuantity, increamentQuantity } from '../../store/slices/cart.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useDeleteCartDBMutation, useUpdateCartDBMutation } from '../../api/cartDB'

import { formatCurrency } from '../../utils/formatCurrency'
import { v4 as uuidv4 } from 'uuid'

type CardOrderProps = {
  product: CartLists
}

const CardOrder = ({ product }: CardOrderProps) => {
  const dispatch = useAppDispatch()
  const [updateCartDbFn, updateCartDbRes] = useUpdateCartDBMutation()
  const { user } = useAppSelector((state) => state.persistedReducer.auth)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, deleteCartDBRes] = useDeleteCartDBMutation()

  const handleUpdateQuantity = async (action: string, item: CartItemState, index: number) => {
    console.log('vafo k')

    if (!user._id && !user.accessToken) {
      console.log('1')
      if (action === 'decreamentQuantity') {
        return dispatch(
          decreamentQuantity({
            index: index,
            name: product.name,
            quantity: item.quantity,
            size: item.size,
            toppings: item.toppings,
            product: item.product
          })
        )
      } else if (action === 'increamentQuantity') {
        return dispatch(
          increamentQuantity({
            index,
            name: product.name,
            quantity: item.quantity,
            size: item.size,
            toppings: item.toppings,
            product: item.product
          })
        )
      }
    } else {
      // item.quantity--
      let quantity: number = item.quantity
      action === 'decreamentQuantity' && quantity--
      action === 'increamentQuantity' && quantity++
      // if (item.quantity == 1 && action === 'decreamentQuantity') {
      //   return deleteCartDBFn(product._id as string)
      // }
      // console.log('2')

      return updateCartDbFn({
        quantity: item.quantity == 1 && action === 'decreamentQuantity' ? 0 : quantity,
        _id: product._id as string,
        id: item._id as string,
        total: item.total
      })
    }
  }
  // console.log(product)

  return (
    <div className='card flex justify-between items-center border border-transparent border-b-[#f1f1f1] tracking-tight '>
      <div className='py-3'>
        <div className='name font-semibold'>{product?.name}</div>
        {product?.items?.length > 0 &&
          product?.items?.map((item, index) => (
            <div className='flex items-center gap-1' key={uuidv4()}>
              <div>
                <p className='text-sm text-[#adaeae] truncate'>{item.size?.name}</p>
                <div className='customize text-[#adaeae] truncate w-[182px]' key={uuidv4()}>
                  <span className='overflow-hidden truncate'>
                    {item.toppings?.map((topping) => topping?.name).join(', ')}
                  </span>
                </div>
                <div className='total text-[#8a733f]'>
                  {formatCurrency(item.price)} x {item.quantity}
                </div>
              </div>
              <div className='flex select-none'>
                <div
                  className={`quantity w-[20px] cursor-pointer h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center ${
                    (updateCartDbRes.isLoading || deleteCartDBRes.isLoading) && 'cursor-no-drop'
                  }`}
                  onClick={() => handleUpdateQuantity('decreamentQuantity', item, index)}
                >
                  <AiOutlineLine className='' />
                </div>
                <div className='amount mx-2'>{item.quantity}</div>
                <div
                  className={`quantity w-[20px] cursor-pointer h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center ${
                    (updateCartDbRes.isLoading || deleteCartDBRes.isLoading) && 'cursor-no-drop'
                  }`}
                  onClick={() => handleUpdateQuantity('increamentQuantity', item, index)}
                >
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CardOrder
