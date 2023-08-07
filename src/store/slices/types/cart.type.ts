/* định dạng dữ liệu khi thêm vào cart */
export interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: { name: string; price: number; _id: string };
  toppings: { name: string; price: number }[];
  total: number;
  product: string;
}

export interface CartItemState {
  image: string;
  price: number;
  quantity: number;
  size: { name: string; price: number; _id: string };
  toppings: { name: string; price: number }[];
  total: number;
  product: string;
}

export interface CartLists {
  name: string;
  items: CartItemState[];
}
