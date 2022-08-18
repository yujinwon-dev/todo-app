export const useAuthToken = () => {
  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('authToken')
  }
  const removeToken = () => {
    localStorage.removeItem('authToken')
  }

  return {
    setToken,
    getToken,
    removeToken,
  }
}
