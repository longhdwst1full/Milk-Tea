import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';

/* lấy ra tất cả sản phẩm */
export const getAllProducts = createAsyncThunk<
  Response,
  { page?: number; limit?: number; query?: string; category?: string }
>('product/getAllProducts', async ({ page = 1, limit = 10, query = '', category = '' }) => {
  try {
    const response = await http.get(
      `/products?_page=${page}&limit=${limit}&q=${query}&&c=${category}`
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (error: any) {
    return error.message;
  }
});
