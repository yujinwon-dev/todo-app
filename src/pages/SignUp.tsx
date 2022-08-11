import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import { emailRule } from '../utils/formInputRule'
import { signUp } from '../api/auth'

export default function SignUp() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const navigate = useNavigate()

  function validateUserInput() {
    if (emailRule.test(email) === false || pw.length < 8 || pw !== pwConfirm) {
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }

  useEffect(() => {
    validateUserInput()
  }, [email, pw, pwConfirm])

  function handleSignUp() {
    signUp(email, pw)
      .then(() => navigate('/auth/login'))
      .catch(() => alert('회원가입에 실패했습니다.'))
  }

  return (
    <Page>
      <H1>SignUp</H1>
      <Form handleSubmit={handleSignUp}>
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
        <Label htmlFor="pwConfirm">
          <LabelSpan>비밀번호 확인</LabelSpan>
          <Input
            type="password"
            name="pwConfirm"
            value={pwConfirm}
            onChange={e => setPwConfirm(e.target.value)}
          />
        </Label>
        <FormButton value="가입" disabled={isDisabled} />
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
