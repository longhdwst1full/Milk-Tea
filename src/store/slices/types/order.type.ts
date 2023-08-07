import { CartItemState } from './cart.type';

export interface IOrderRes {
  user: string;
  items: Omit<CartItemState, 'total'>[] | number[];
  total: number;
  priceShipping: number;
  noteOrder: string | undefined;
  paymentMethodId: string;
  inforOrderShipping: { name: string; phone: string; address: string; noteShipping: string };
}
