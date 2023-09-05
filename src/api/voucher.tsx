import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReAuth from './requestRefresh'
import { IVoucher, IVoucherDocs } from '../interfaces/voucher.type'

const ApiVoucher = createApi({
  reducerPath: 'Voucher',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['voucher'],
  endpoints: (builder) => ({
    getAllVouchers: builder.query<IVoucherDocs, number | string>({
      query: (page) => `/api/vouchers?_page=${page}`,
      providesTags: ['voucher']
    }),

    addVoucher: builder.mutation<void, IVoucher>({
      query: (voucher) => ({
        url: '/api/voucher',
        method: 'POST',
        body: voucher
      }),
      invalidatesTags: ['voucher']
    }),

    deleteVoucher: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/voucher/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['voucher']
    }),

    updateVoucher: builder.mutation<any, IVoucher>({
      query: (voucher) => ({
        url: `/api/voucher/${voucher._id}`,
        method: 'PUT',
        body: { code: voucher.code, discount: voucher.discount, sale: voucher.sale }
      }),
      invalidatesTags: ['voucher']
    })
  })
})

export const { useGetAllVouchersQuery, useAddVoucherMutation, useDeleteVoucherMutation, useUpdateVoucherMutation } =
  ApiVoucher
export default ApiVoucher
