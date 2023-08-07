import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProductDocs } from '../../interfaces/products.type';
import { getAllProducts } from '../services/product.service';

interface ProductState {
  products: IProductDocs;
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: {} as IProductDocs,
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* get all products */
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<IProductDocs>) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || '';
    });
  },
});

export const productReducer = productSlice.reducer;
