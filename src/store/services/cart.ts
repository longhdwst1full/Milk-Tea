import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../api/instance'
import { CartLists } from '../slices/types/cart.type'

export const addToCartDB = createAsyncThunk('cartDb/add', async (dataCart: CartLists) => {
  try {
    const { data } = await http.post(`/cart`, dataCart)
    return data.data
  } catch (error) {
    return error
  }
})

export const deleteCart = createAsyncThunk('cartDb/deleteCart', async (id: string) => {
  try {
    const { data } = await http.delete(`/cart/${id}`)
    return data
  } catch (error) {
    return error
  }
})

export const updateCart = createAsyncThunk('cartDb/updateCart', async (cart: any) => {
  try {
    const { data } = await http.put(`/category/${cart._id}`, { name: cart.name })
    console.log(data)
    return data
  } catch (error: any) {
    return error.message
  }
})

export const getOneCart = createAsyncThunk('cartDb/getOneCart', async (id: string) => {
  try {
    const { data } = await http.get(`/cart/${id}`)
    return data
  } catch (error: any) {
    return error.message
  }
})

export const getAllCarts = createAsyncThunk('cartDb/getAllCart', async () => {
  try {
    const { data } = await http.get('/cart')
    return data.docs
  } catch (error: any) {
    return error.message
  }
})
