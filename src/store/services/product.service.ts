import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';

/* lấy ra tất cả sản phẩm */
export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  try {
    const response = await http.get('/products?_page=1&_limit=10');
    if (response && response.data) {
      return response.data;
    }
  } catch (error: any) {
    return error.message;
  }
});
