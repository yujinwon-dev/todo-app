import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import { emailRule } from '../utils/formInputRule'
import { ResponseData, login } from '../api/auth'
import { ResponseData as TodoResponseData, axiosInstance, getTodos } from '../api/todo'
import { todosAtom } from '../atoms/todo'

const token = localStorage.getItem('token')

export default function Login() {
  const [, setTodos] = useAtom(todosAtom)
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  useEffect(() => {
    if (emailRule.test(email) === false || pw.length < 8) {
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }, [email, pw])

  function handleLogin() {
    if (token) {
      navigate('/')
      return
    }
    login(email, pw)
      .then(data => {
        const { message, token } = data as ResponseData
        localStorage.setItem('token', token)
        axiosInstance.defaults.headers.common.Authorization = token
        getTodos()
        .then(res => {
          const resValue = res as TodoResponseData
          setTodos(resValue.data)
        })
        alert(message)
        navigate('/')
      })
  }
  return (
    <Page>
      <H1>Login</H1>
      <Form handleSubmit={handleLogin}>
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
        <FormButton value="로그인" disabled={isDisabled} />
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
