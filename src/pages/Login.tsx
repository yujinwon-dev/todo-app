import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Form from '../components/common/Form'
import SubmitButton from '../components/common/SubmitButton'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { emailRule } from '../utils/formInputRule'
import useTokenCheck from '../hooks/useTokenCheck'
import useAuth from '../hooks/queries/useAuth'
import { toast } from 'react-toastify'
import { useAuthToken } from '../hooks/useAuthToken'

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [pw, setPw] = useState('')
  const [isValidPw, setIsValidPw] = useState(false)
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()
  const { setToken } = useAuthToken()
  const { useLogin } = useAuth()
  const { mutate: login } = useLogin({
    onSuccess: data => {
      const { message, token } = data
      setToken(token)
      navigate('/')
      toast.success(message)
    },
  })

  function validateUserInput() {
    let emailCheck = false
    let pwCheck = false
    if (email.length && emailRule.test(email)) {
      setIsValidEmail(true)
      emailCheck = true
    } else {
      setIsValidEmail(false)
      emailCheck = false
    }
    if (pw.length && pw.length >= 8) {
      setIsValidPw(true)
      pwCheck = true
    } else {
      setIsValidPw(false)
      pwCheck = false
    }
    if (!emailCheck || !pwCheck) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }

  useEffect(() => {
    validateUserInput()
  }, [email, pw])

  function handleLogin() {
    if (isValidToken) {
      navigate('/')
      return
    }
    login({ email, password: pw })
  }

  return (
    <Page>
      <H1>Login</H1>
      <Form handleSubmit={handleLogin}>
        <InputContainer>
          <Label htmlFor="email">
            <LabelSpan>이메일</LabelSpan>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Label>
          {email.length > 0 &&
            (isValidEmail ? <StyledCheckIcon /> : <StyledCancelIcon />)}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="pw">
            <LabelSpan>비밀번호</LabelSpan>
            <Input
              type="password"
              name="pw"
              value={pw}
              onChange={e => setPw(e.target.value)}
            />
          </Label>
          {pw.length > 0 &&
            (isValidPw ? <StyledCheckIcon /> : <StyledCancelIcon />)}
        </InputContainer>
        <SubmitButton value="로그인" disabled={isDisabled} />
      </Form>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  margin: 1rem 0;
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem 0;
`

const Label = styled.label`
  display: flex;
`

const LabelSpan = styled.span`
  min-width: 120px;
  padding-right: 1rem;
`

const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 16px;
  border-radius: 5px;
  border: 1px solid #9a9a9a;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`

const StyledCancelIcon = styled(CancelIcon)`
  position: absolute;
  top: 0.5rem;
  right: 12px;
  height: 100%;
  color: #ff4816;
`

const StyledCheckIcon = styled(CheckCircleIcon)`
  position: absolute;
  top: 0.5rem;
  right: 12px;
  height: 100%;
  color: #2860e1;
`
