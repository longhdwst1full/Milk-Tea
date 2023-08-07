import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from '../../api/requestRefresh';


export const OrderAPI = createApi({
  reducerPath: 'Order',
  tagTypes: ['Order'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllOrder: builder.query<any, void>({
      query: () => '/api/orders',
      // providesTags: (result) => {
        // if (result) {
        //   const final = [
        //     ...result.data.map(({ _id }) => ({ type: 'Order' as const, _id })),
        //     { type: 'Order' as const, id: 'LIST' },
        //   ];
        //   return final;
        // }

        // return [{ type: 'Order', id: 'LIST' }];
      // },
    }),
    createOrder: builder.mutation({
      query: (body:  any) => ({
        url: '/api/create-order',
        body: body,
        method: 'POST',
      }),
      // invalidatesTags: () => [{ type: 'Order', id: 'LIST' }],
    }),
    confirmOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/confirmed/${id}`,

        method: 'PUT',
      }),
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
    deliveredOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/delivered/${id}`,
        method: 'PUT',
      }),
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
    doneOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/done/${id}`,
        method: 'PUT',
      }),
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
    canceledOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/canceled/${id}`,
        method: 'PUT',
      }),
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});
// console.log(ToppingAPI);

export const {
useConfirmOrderMutation,
useCreateOrderMutation,
useGetAllOrderQuery,
useCanceledOrderMutation,
useDeliveredOrderMutation,
useDoneOrderMutation,
useLazyGetAllOrderQuery
} = OrderAPI;
