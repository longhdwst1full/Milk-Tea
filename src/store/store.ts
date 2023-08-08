import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ApiProducts } from '../api/Product';
import { ApiUser } from '../api/User';
import ApiVoucher from '../api/voucher';
import { Auth } from '../api/Auth';
import AuthReducer from './slices/Auth.slice';
import RoleApi from '../api/role';
import { ToppingAPI } from '../api/topping';
import cartReducer from './slices/cart.slice';
import { categoriesReducer } from './slices/categories';
import { productReducer } from './slices/product.slice';
import storage from 'redux-persist/lib/storage';
import CategoryApi from '../api/category';
import { OrderAPI } from './slices/order';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'auth'],
};
const rootReducer = combineReducers({
  products: productReducer,
  auth: AuthReducer,
  cart: cartReducer,
  category: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiProducts.reducerPath]: ApiProducts.reducer,
    [ToppingAPI.reducerPath]: ToppingAPI.reducer,
    [ApiVoucher.reducerPath]: ApiVoucher.reducer,
    [RoleApi.reducerPath]: RoleApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [Auth.reducerPath]: Auth.reducer,
    [OrderAPI.reducerPath]: OrderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      ApiUser.middleware,
      ApiProducts.middleware,
      ToppingAPI.middleware,
      ApiVoucher.middleware,
      RoleApi.middleware,
      CategoryApi.middleware,
      Auth.middleware,
      OrderAPI.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
