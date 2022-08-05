import axios, { AxiosRequestConfig } from 'axios'

export interface ResponseData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface AxiosResponse<T = never> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080/todos',
  headers: {
    Authorization: token || ''
  }
})

export const getTodos = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get('')
    return response.data
  } catch (error) {
    return error
  }
}

export const getTodoById = async (id: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(`/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}


export const createTodo = async (title: string, content: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.post('', { title, content })
    return response.data
  } catch (error) {
    return error
  }
}

export const updateTodo = async (id: string, title: string, content: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(`/${id}`, { title, content })
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(`/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}
