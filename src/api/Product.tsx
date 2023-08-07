import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProductDocs } from '../interfaces/products.type';
import { IResImage } from '../interfaces/image.type';
import { baseQueryWithReauth } from './Auth';

export const ApiProducts = createApi({
  reducerPath: 'ApiProduct',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['product'],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IProductDocs, void>({
      query: () => '/api/products',
      providesTags: (result) =>
        result?.docs
          ? [
              ...result.docs.map(({ _id }) => ({ type: 'product' as const, _id })),
              { type: 'product', id: 'List' },
            ]
          : [{ type: 'product', id: 'List' }],
    }),

    fetchProductById: builder.query<void, string | undefined>({
      query: (id) => `/api/product/${id}`,
    }),

    addProduct: builder.mutation<void, IProduct>({
      query: ({ ...rest }) => ({
        url: '/api/product',
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: [{ type: 'product', id: 'List' }],
    }),

    updateProduct: builder.mutation<void, IProduct>({
      query: ({ _id, ...rest }) => ({
        url: `/api/product/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'product', id: 'List' }],
    }),

    deleteRealProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'product', id: 'List' }],
    }),

    deleteFakeProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/deleteFakeProduct/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'product', id: 'List' }],
    }),

    restoreProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/restoreProduct/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'product', id: id }],
    }),

    uploadImagesProduct: builder.mutation<IResImage, any>({
      query: (files) => ({
        url: '/api/uploadImages',
        method: 'POST',
        body: files,
      }),
    }),

    deleteImagesProduct: builder.mutation<any, string>({
      query: (publicId) => ({
        url: `/api/deleteImages/${publicId}`,
        method: 'DELETE',
        body: publicId,
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useUploadImagesProductMutation,
  useDeleteImagesProductMutation,
  useAddProductMutation,
  useDeleteFakeProductMutation,
  useDeleteRealProductMutation,
  useUpdateProductMutation,
  useFetchProductByIdQuery,
  useRestoreProductMutation,
} = ApiProducts;
