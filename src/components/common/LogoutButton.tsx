import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthToken } from '../../hooks/useAuthToken'

export default function LogoutButton() {
  const navigate = useNavigate()
  const { removeToken } = useAuthToken()

  return (
    <Button
      onClick={() => {
        removeToken()
        navigate('/intro')
      }}
    >
      ๋ก๊ทธ์์
    </Button>
  )
}

const Button = styled.button`
  position: absolute;
  right: -13rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
`
