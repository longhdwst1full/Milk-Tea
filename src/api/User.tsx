import { IUser, IUserDocs, responseUser } from '../interfaces/user.type'

import { IResImage } from '../interfaces/image.type'
import { baseQueryWithReauth } from './Auth'
import { createApi } from '@reduxjs/toolkit/query/react'

// import baseQueryWithReAuth from './requestRefresh';

export const ApiUser = createApi({
  reducerPath: 'ApiUser',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchUser: builder.query<responseUser, void>({
      query: () => ({
        url: '/auth/getUser',
        credentials: 'include'
      })
    }),

    //get all user
    getAllUsers: builder.query<IUserDocs, number>({
      query: (page = 5) => `/api/users?_page=${page}`,
      providesTags: ['user']
    }),

    //delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['user']
    }),

    //add new user
    addUser: builder.mutation<void, IUser>({
      query: (user) => ({
        url: '/api/users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['user']
    }),

    //update user
    updateUser: builder.mutation<void, IUser>({
      query: (user) => ({
        url: `/api/users/${user._id}`,
        method: 'PATCH',
        body: {
          username: user.username,
          password: user.password,
          account: user.account,
          role: user.role,
          address: user.address,
          avatar: user.avatar
        }
      }),
      invalidatesTags: ['user']
    }),

    //Upload image user
    upLoadAvartaUser: builder.mutation<IResImage, any>({
      query: (file) => ({
        url: '/api/uploadImages',
        method: 'POST',
        body: file
      })
    }),

    //Delete avarta
    deleteImageUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/deleteImages/${id}`,
        method: 'DELETE',
        body: id
      })
    })
  })
})

export const {
  useFetchUserQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useUpLoadAvartaUserMutation,
  useDeleteImageUserMutation
} = ApiUser
export const SizeReducer = ApiUser.reducer
