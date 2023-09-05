import { IRole, IRoleDocs } from '../interfaces/role.type'

import { baseQueryWithReauth } from './Auth'
import { createApi } from '@reduxjs/toolkit/query/react'

const RoleApi = createApi({
  reducerPath: 'Role',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['role'],
  endpoints: (builder) => ({
    getAllRoles: builder.query<IRoleDocs, void>({
      query: () => '/api/roles',
      providesTags: ['role']
    }),

    deleteRole: builder.mutation({
      query: (id: string) => ({
        url: `/api/role/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['role']
    }),

    addRole: builder.mutation({
      query: (role: IRole) => ({
        url: '/api/role',
        method: 'POST',
        body: role
      }),
      invalidatesTags: ['role']
    }),

    updateRole: builder.mutation({
      query: (role: IRole) => ({
        url: `/api/role/${role._id}`,
        method: 'PUT',
        body: { name: role.name }
      }),
      invalidatesTags: ['role']
    })
  })
})

export const { useGetAllRolesQuery, useDeleteRoleMutation, useAddRoleMutation, useUpdateRoleMutation } = RoleApi

export default RoleApi
