
import axios, { AxiosRequestConfig } from 'axios'

export interface ResponseData {
  message: string;
  token: string;
}

interface AxiosResponse<T = never>  {
  data: ResponseData;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}

export const login = async (email: string, password: string) => {
  try {
    const response: AxiosResponse = await axios.post('http://127.0.0.1:8080/users/login', { email, password })
    return response.data
  } catch (error) {
    return error
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    const response: AxiosResponse = await axios.post('http://127.0.0.1:8080/users/create', { email, password })
    return response.data
  } catch (error) {
    return error
  }
}
