import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Form from '../components/Form'
import SubmitButton from '../components/SubmitButton'
import { emailRule } from '../utils/formInputRule'
import apiInstance from '../api/axios'
import { login } from '../api/auth'
import useTokenCheck from '../hooks/useTokenCheck'

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function validateUserInput() {
    if (emailRule.test(email) === false || pw.length < 8) {
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }

  useEffect(() => {
    validateUserInput()
  }, [email, pw])

  async function handleLogin() {
    try {
      const { message, token } = await login(email, pw)
      localStorage.setItem('token', token)
      apiInstance.defaults.headers.common.Authorization = token
      alert(message)
      navigate('/')
    } catch (error) {
      alert('로그인에 실패했습니다.')
    }
  }

  function handleFormSubmit() {
    if (isValidToken) {
      navigate('/')
      return
    }
    handleLogin()
  }

  return (
    <Page>
      <H1>Login</H1>
      <Form handleSubmit={handleFormSubmit}>
        <Label htmlFor="email">
          <LabelSpan>이메일</LabelSpan>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Label>
        <Label htmlFor="pw">
          <LabelSpan>비밀번호</LabelSpan>
          <Input
            type="password"
            name="pw"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
        </Label>
        <SubmitButton value="로그인" disabled={isDisabled} />
      </Form>
    </Page>
  )
}


const Page = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  margin: 1rem 0;
`


const Label = styled.label`
  display: flex; 
`

const LabelSpan = styled.span`
  padding-right: 1rem;
`

const Input = styled.input`
  width: 230px;
  height: 36px;
  padding: 0 16px;
  border-radius: 5px;
  border: 1px solid #9a9a9a;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  
  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`
