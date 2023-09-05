import { ICategory } from '../../interfaces/category.type'
import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../api/instance'

export const getAllCates = createAsyncThunk('cate/getAllCate', async () => {
  try {
    const { data } = await http.get('/categories?_page=1&_limit=10')
    return data.docs
  } catch (error: any) {
    return error.message
  }
})

export const deleteCate = createAsyncThunk('cate/deleteCate', async (id: string) => {
  try {
    const { data } = await http.delete(`/category/${id}`)
    return data
  } catch (error) {
    return error
  }
})

export const addCate = createAsyncThunk('cate/addCate', async (cate: Pick<ICategory, 'name'>) => {
  try {
    const { data } = await http.post('/category', cate)

    return data.data
  } catch (error) {
    return error
  }
})

export const updateCate = createAsyncThunk('cate/updateCate', async (cate: Pick<ICategory, 'name' | '_id'>) => {
  try {
    const { data } = await http.put(`/category/${cate._id}`, { name: cate.name })
    console.log(data)
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.message
  }
})

export const getOneCate = createAsyncThunk('cate/getOneCate', async (id: string) => {
  try {
    const { data } = await http.get(`/category/${id}`)
    return data
  } catch (error: any) {
    return error.message
  }
})
