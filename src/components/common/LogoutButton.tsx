import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function LogoutButton() {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => {
        localStorage.removeItem('token')
        navigate('/intro')
      }}
    >
      로그아웃
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
