import { useEffect, useState } from 'react'

export default function useTokenCheck() {
  const token = localStorage.getItem('token')
  const [isValidToken, setIsValidToken] = useState(true)

  useEffect(() => {
    if (!token || token === 'undefined') {
      setIsValidToken(false)
    }
  })

  return isValidToken
}
