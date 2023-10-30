import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './Auth'
import { IBlogs, IBlogsDocs } from '../interfaces/Blogs.type'

const NewBlogsApi = createApi({
  reducerPath: 'Blogs',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['blogs'],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<IBlogsDocs, void>({
      query: () => 'api/newsBlog',
      providesTags: ['blogs']
    }),

    deleteBlogs: builder.mutation<void, string>({
      query: (_id: string) => ({
        url: `/api/newsBlog-remove/${_id}`,
        method: `DELETE`
      }),
      invalidatesTags: ['blogs']
    }),

    addBlogs: builder.mutation<void, IBlogs>({
      query: (size: any) => ({
        url: '/api/create-newsBlog',
        method: 'POST',
        body: size
      }),
      invalidatesTags: ['blogs']
    }),

    updateBlogs: builder.mutation<void, IBlogs>({
      query: ({ ...rest }) => ({
        url: `/api/newsBlog/${rest._id}`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: ['blogs']
    })
  })
})

export const { useGetAllBlogsQuery, useDeleteBlogsMutation, useAddBlogsMutation, useUpdateBlogsMutation } = NewBlogsApi
export default NewBlogsApi
