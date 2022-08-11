
import apiInstance from './axios';

export interface authData {
  message: string;
  token: string;
}

export const login = async (email: string, password: string): Promise<authData> => {
  const { data } = await apiInstance.post('/users/login', { email, password })
  return data
}

export const signUp = async (email: string, password: string): Promise<authData> => {
  const { data } = await apiInstance.post('/users/create', { email, password })
  return data
}
