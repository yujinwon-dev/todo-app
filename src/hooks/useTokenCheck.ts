import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export default function useTokenCheck() {
  const token = localStorage.getItem('token')
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (!token || token.length === 0) {
      setIsValid(false)
    }
  })
  
  return isValid
}