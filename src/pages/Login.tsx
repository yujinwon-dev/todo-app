import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <>
      <h1>Login</h1>
      <Form handleSubmit={handleLogin}>
        <label htmlFor="email">
          이메일
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="pw">
          비밀번호
          <input
            type="password"
            name="pw"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
        </label>
        <FormButton value="로그인" disabled={isDisabled} />
      </Form>
    </>
  )
}
