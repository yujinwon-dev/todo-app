import { useEffect, useState } from 'react'
import { useAuthToken } from './useAuthToken'

export default function useTokenCheck() {
  const { getToken } = useAuthToken()
  const authToken = getToken() || ''
  const [isValidToken, setIsValidToken] = useState(true)

  useEffect(() => {
    if (!authToken || authToken === 'undefined') {
      setIsValidToken(false)
    }
  })

  return isValidToken
}
