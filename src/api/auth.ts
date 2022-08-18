
import apiInstance from './axios';

export interface AuthData {
  message: string;
  token: string;
}

export interface AuthProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: AuthProps) => {
  const { data } = await apiInstance.post('/users/login', { email, password })
  return data
}

export const signUp = async ({ email, password }: AuthProps) => {
  const { data } = await apiInstance.post('/users/create', { email, password })
  return data
}
