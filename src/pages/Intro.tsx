import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import useTokenCheck from "../hooks/useTokenCheck"

export default function Intro() {
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()
  return (
    <ButtonsContainer>
      <LoginButton onClick={() => {
        if (isValidToken) {
          navigate('/')
        } else {
          navigate('/auth/login')
        }
      }}>로그인</LoginButton>
      <SignUpButton onClick={() => navigate('/auth/login')}>회원가입</SignUpButton>
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const SignUpButton = styled.button`
  width: 13rem;
  height: 15rem;
  font-size: 1.5rem;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #9be8d6;
  }
`

const LoginButton = styled(SignUpButton)`
  margin-right: 1.5rem;
`