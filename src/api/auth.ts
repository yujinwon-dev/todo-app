
import apiInstance from './axios';
import { AuthData, AuthProps } from '../types/auth';

export const login = async ({ email, password }: AuthProps): Promise<AuthData> => {
  const { data } = await apiInstance.post('/users/login', { email, password })
  return data
}

export const signUp = async ({ email, password }: AuthProps): Promise<AuthData> => {
  const { data } = await apiInstance.post('/users/create', { email, password })
  return data
}
