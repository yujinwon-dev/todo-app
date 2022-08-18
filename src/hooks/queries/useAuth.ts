import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { login, signUp } from '../../api/auth'
import { AuthData, AuthProps } from '../../types/auth'

const useAuth = () => {
  const useLogin = (
    options?: UseMutationOptions<AuthData, Error, AuthProps>,
  ) => {
    return useMutation(login, options)
  }

  const useSignUp = (
    options?: UseMutationOptions<AuthData, Error, AuthProps>,
  ) => {
    return useMutation(signUp, options)
  }

  return {
    useLogin,
    useSignUp,
  }
}

export default useAuth
