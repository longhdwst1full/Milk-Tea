import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { responseUser } from '../../interfaces/user.type';
import { Auth } from '../../api/Auth';
import { ApiUser } from '../../api/User';
import { IRole } from '../../interfaces/role.type';

const initialState: responseUser = {
  user: {
    googleId: '',
    twitterId: '',
    githubId: '',
    facebookId: '',
    username: '',
    account: '',
    avatar: '',
    address: '',
    products: [],
    order: [],
    role: {} as IRole,
    accessToken: '',
    refreshToken: '',
  },
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    refreshUser: (state, { payload }) => {
      state.user = payload;
    },
    tickLogin: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        Auth.endpoints.login.matchFulfilled,
        Auth.endpoints.fetchUser.matchFulfilled,
        Auth.endpoints.updateInfor.matchFulfilled
      ),
      (state, { payload }) => {
        if (payload.user) {
          state.user = payload.user;
        }
      }
    );
    builder.addMatcher(Auth.endpoints.logout.matchFulfilled, (state) => {
      state.user = {};
    });
  },
});

export const { refreshUser, tickLogin } = AuthSlice.actions;

export default AuthSlice.reducer;
