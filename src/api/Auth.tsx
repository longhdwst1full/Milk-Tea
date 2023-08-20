import { IUser, responseUser } from '../interfaces/user.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store/store';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { refreshUser } from '../store/slices/Auth.slice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken;
    console.log(accessToken);

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.meta?.response?.status === 403) {
    // try to get a new token
    const refreshToken = await baseQuery('/api/refreshToken', api, extraOptions); // Request refreshToken
    if (refreshToken.data) {
      // store the new token
      const { user } = (api.getState() as RootState).persistedReducer.auth;
      api.dispatch(refreshUser({ ...refreshToken.data, user })); // Cấp lại AccessToken
    }
  }
  return result;
};

export const Auth = createApi({
  reducerPath: 'Auth',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<void, IUser>({
      query: ({ ...rest }) => ({
        url: '/api/register',
        body: rest,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    login: builder.mutation<responseUser, IUser>({
      query: ({ ...rest }) => ({
        url: '/api/login',
        body: rest,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credential: 'include',
      }),
    }),
    fetchUser: builder.query<responseUser, void>({
      query: () => ({
        url: '/auth/getUser',
        credentials: 'include',
      }),
    }),
    updateInfor: builder.mutation<any, IUser>({
      query: ({ _id, ...rest }) => ({
        url: `/api/updateInfor/${_id}`,
        method: 'PATCH',
        body: rest,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchUserQuery,
  useUpdateInforMutation,
} = Auth;
