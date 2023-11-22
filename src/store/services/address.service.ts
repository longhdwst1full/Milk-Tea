import { IAddress, IAddressCreate, IDocAddress } from '../../interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BACKEND}` }),
  tagTypes: ['Address'],
  endpoints: (build) => ({
    createAddress: build.mutation<IAddress, Partial<IAddressCreate>>({
      query(body) {
        return {
          url: `/address/create`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Address', id: 'LIST' }]
    }),

    getAddress: build.query<IDocAddress, { userId: string }>({
      query: ({ userId }) => `/address/get/${userId}`,
      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.docs.map(({ _id }) => ({ type: 'Address' as const, _id })),
            { type: 'Address' as const, id: 'LIST' }
          ]
          return final
        }
        return [{ type: 'Address', id: 'LIST' }]
      }
    }),

    deleteAddress: build.mutation<{ address: IAddress }, string>({
      query(id) {
        return {
          url: `/address/delete/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: [{ type: 'Address', id: 'LIST' }]
    }),

    updateAddress: build.mutation<IAddress, Partial<IAddress>>({
      query(body) {
        return {
          url: `/address/update/${body._id}`,
          method: 'PUT',
          body
        }
      },
      invalidatesTags: [{ type: 'Address', id: 'LIST' }]
    })
  })
})

export const { useCreateAddressMutation, useGetAddressQuery, useDeleteAddressMutation, useUpdateAddressMutation } =
  addressApi
