import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Form from '../components/common/Form'
import SubmitButton from '../components/common/SubmitButton'
import { emailRule } from '../utils/formInputRule'
import useTokenCheck from '../hooks/useTokenCheck'
import useAuth from '../hooks/queries/useAuth'
import apiInstance from '../api/axios'
import { AxiosError } from 'axios'

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()
  const { useLogin } = useAuth()
  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      const { message, token } = data
      localStorage.setItem('token', token)
      apiInstance.defaults.headers.common.Authorization = token
      alert(message)
      navigate('/')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.details)
      }
    }
  })

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
    login({ email, password: pw })
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
