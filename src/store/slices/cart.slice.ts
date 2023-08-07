import { CartItem, CartLists } from './types/cart.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  items: CartLists[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      // /* check xem đã có sản phẩm nào tồn tại bên trong giỏ hàng chưa */
      const products = [...state.items];
      const productIndex = products.findIndex((item) => item.name === product.name);
      if (productIndex < 0) {
        state.items.push({
          name: product.name,
          items: [
            {
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              size: product.size,
              toppings: product.toppings,
              total: product.total,
              product: product.product,
            },
          ],
        });
      } else {
        /* check xem có sản phẩm có trùng size không */
        const productSizeIndex = products[productIndex].items.findIndex(
          (item) => item.size.name === product.size.name
        );
        if (productSizeIndex < 0) {
          const newProduct = {
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            size: product.size,
            toppings: product.toppings,
            total: product.total,
            product: product.product,
          };
          state.items[productIndex].items.push(newProduct);
        } else {
          /* nếu mà trùng size & trùng tên => không có topping => thêm mới sản phẩm */
          if (product.toppings.length === 0 && product.quantity === 1) {
            /* tăng số lượng lên */
            state.items[productIndex].items[productSizeIndex].quantity += product.quantity;
            state.items[productIndex].items[productSizeIndex].total += product.total;
          }
          if (product.toppings.length === 0 && product.quantity > 1) {
            /* tăng số lượng lên */
            state.items[productIndex].items[productSizeIndex].quantity += product.quantity;
            state.items[productIndex].items[productSizeIndex].total += product.total;
          }
          /* nếu mà trùng size & trùng tên => có topping => thêm mới sản phẩm */
          if (
            product.toppings.length > 0 &&
            state.items[productIndex].items[productSizeIndex].quantity === 1
          ) {
            const newProduct = {
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              size: product.size,
              toppings: product.toppings,
              total: product.total,
              product: product.product,
            };
            console.log('test1');
            state.items[productIndex].items.push(newProduct);
          }
          /* nếu mà trùng size & trùng tên => có topping => tăng số lượng lên */
          if (
            product.toppings.length > 0 &&
            state.items[productIndex].items[productSizeIndex].quantity > 1
          ) {
            const newProduct = {
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              size: product.size,
              toppings: product.toppings,
              total: product.total,
              product: product.product,
            };
            state.items[productIndex].items.push(newProduct);
          }
        }
      }
    },
    increamentQuantity: (
      state,
      action: PayloadAction<{
        index: number;
        name: string;
        quantity: number;
        size: { _id: string; name: string; price: number };
        toppings: { name: string; price: number }[];
        product: string;
      }>
    ) => {
      const payload = action.payload;
      const products = [...state.items];
      /* tìm ra sản phẩm muốn tăng số lượng */
      const productIndex = products.findIndex((item) => item.name === payload.name);
      if (productIndex >= 0) {
        if (payload.toppings.length === 0) {
          /* tìm ra size của sản phẩm muốn tăng số lượng */
          state.items[productIndex].items[payload.index].quantity++;
          state.items[productIndex].items[payload.index].total += payload.size.price;
        } else {
          /* tính tổng tiền của topping đó */
          const totalTopping = payload.toppings.reduce((total, item) => {
            return (total += item.price);
          }, 0);
          state.items[productIndex].items[payload.index].quantity++;
          state.items[productIndex].items[payload.index].total += totalTopping + payload.size.price;
        }
      }
    },
    decreamentQuantity: (
      state,
      action: PayloadAction<{
        index: number;
        name: string;
        quantity: number;
        size: { _id: string; name: string; price: number };
        toppings: { name: string; price: number }[];
        product: string;
      }>
    ) => {
      const result = action.payload;
      const products = [...state.items];
      /* tìm ra sản phẩm muốn tăng số lượng */
      const productIndex = products.findIndex((item) => item.name === result.name);
      if (productIndex >= 0) {
        if (result.toppings.length === 0) {
          /* tìm ra size của sản phẩm muốn tăng số lượng */
          state.items[productIndex].items[result.index].quantity--;
          state.items[productIndex].items[result.index].total -= result.size.price;
          if (state.items[productIndex].items[result.index].quantity === 0) {
            state.items[productIndex].items.splice(result.index, 1);
            if (state.items[productIndex].items.length === 0) {
              state.items.splice(productIndex, 1);
            }
          }
        } else {
          /* tính tổng tiền của topping đó */
          const totalTopping = result.toppings.reduce((total, item) => {
            return (total += item.price);
          }, 0);
          state.items[productIndex].items[result.index].quantity--;
          state.items[productIndex].items[result.index].total -= totalTopping + result.size.price;
          if (state.items[productIndex].items[result.index].quantity === 0) {
            state.items[productIndex].items.splice(result.index, 1);
            if (state.items[productIndex].items.length === 0) {
              state.items.splice(productIndex, 1);
            }
          }
        }
      }
    },
    resetAllCart: (state) => {
      state.items = [];
    },
    /* optimize code */
    // updateCartItem: (state, action) => {
    //   const { index, quantityChange, priceChange } = action.payload;
    //   const item = state.items[index];
    //   item.quantity += quantityChange;
    //   item.total += priceChange * quantityChange;
    // },
    // removeCartItem: (state, action) => {
    //   const { productIndex, itemIndex } = action.payload;
    //   state.items[productIndex].items.splice(itemIndex, 1);
    //   if (state.items[productIndex].items.length === 0) {
    //     state.items.splice(productIndex, 1);
    //   }
    // },
    // updateQuantity: (state, action) => {
    //   const { index, name, quantity, size, toppings } = action.payload;
    //   const products = [...state.items];
    //   const productIndex = products.findIndex((item) => item.name === name);
    //   if (productIndex >= 0) {
    //     const currentItem = state.items[productIndex].items[index];
    //     const totalTopping = toppings.reduce((total, item) => total + item.price, 0);
    //     const totalPriceChange = totalTopping + size.price;
    //     if (quantity > 0) {
    //       state.updateCartItem({ index, quantityChange: quantity, priceChange: totalPriceChange });
    //     } else {
    //       state.updateCartItem({ index, quantityChange: -1, priceChange: -totalPriceChange });
    //       if (currentItem.quantity === 0) {
    //         state.removeCartItem({ productIndex, itemIndex: index });
    //       }
    //     }
    //   }
    // },
  },
});

export const { addToCart, resetAllCart, increamentQuantity, decreamentQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
