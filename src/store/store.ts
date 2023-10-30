import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';

import { ApiProducts } from '../api/Product'
import { ApiUser } from '../api/User'
import ApiVoucher from '../api/voucher'
import { Auth } from '../api/Auth'
import AuthReducer from './slices/Auth.slice'
import { ToppingAPI } from '../api/topping'
import cartReducer from './slices/cart.slice'
import { categoriesReducer } from './slices/categories'
import { productReducer } from './slices/product.slice'
import storage from 'redux-persist/lib/storage'
import CategoryApi from '../api/category'
import { OrderAPI } from './slices/order'
import { CartDBAPI } from '../api/cartDB'
import SizeApi from './slices/size.slice'
import BannerApi from '../api/banner'
import AnalyticsApi from '../api/analytics'
import NewBlogsApi from '../api/NewBlogs'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'auth', 'category']
}

const productsPersistConfig = {
  key: 'products',
  storage,
  blacklist: ['products']
}

const rootReducer = combineReducers({
  products: persistReducer(productsPersistConfig, productReducer),
  auth: AuthReducer,
  cart: cartReducer,
  category: categoriesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [
  ApiUser.middleware,
  ApiProducts.middleware,
  ToppingAPI.middleware,
  ApiVoucher.middleware,
  // RoleApi.middleware,
  CategoryApi.middleware,
  Auth.middleware,
  CartDBAPI.middleware,
  OrderAPI.middleware,
  SizeApi.middleware,
  BannerApi.middleware,
  AnalyticsApi.middleware,
  NewBlogsApi.middleware
]
export const store = configureStore({
  reducer: {
    persistedReducer,
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiProducts.reducerPath]: ApiProducts.reducer,
    [ToppingAPI.reducerPath]: ToppingAPI.reducer,
    [ApiVoucher.reducerPath]: ApiVoucher.reducer,
    // [RoleApi.reducerPath]: RoleApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [Auth.reducerPath]: Auth.reducer,
    [CartDBAPI.reducerPath]: CartDBAPI.reducer,
    [OrderAPI.reducerPath]: OrderAPI.reducer,
    [SizeApi.reducerPath]: SizeApi.reducer,
    [BannerApi.reducerPath]: BannerApi.reducer,
    [AnalyticsApi.reducerPath]: AnalyticsApi.reducer,
    [NewBlogsApi.reducerPath]: NewBlogsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(...middleware)
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
