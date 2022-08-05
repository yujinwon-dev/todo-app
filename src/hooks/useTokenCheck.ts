import { useEffect, useState } from 'react'

const token = localStorage.getItem('token')

export default function useTokenCheck() {
  const [isTokenValid, setIsTokenValid] = useState(true)

  useEffect(() => {
    if (!token || token.length === 0) {
      setIsTokenValid(false)
    }
  })
  
  return isTokenValid
}