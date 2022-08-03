import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import { emailRule } from '../utils/formInputRule'
import { signUp } from '../api/auth'

export default function SignUp() {
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  useEffect(() => {
    if (emailRule.test(email) === false || pw.length < 8 || pw !== pwConfirm) {
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }, [email, pw, pwConfirm])
  function handleSignUp() {
    signUp(email, pw)
      .then(() => {
        navigate('/')
      })
  }
  return (
    <>
      <h1>SignUp</h1>
      <Form handleSubmit={handleSignUp}>
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
        <label htmlFor="pwConfirm">
          비밀번호 확인
          <input
            type="password"
            name="pwConfirm"
            value={pwConfirm}
            onChange={e => setPwConfirm(e.target.value)}
          />
        </label>
        <FormButton value="가입" disabled={isDisabled} />
      </Form>
    </>
  )
}
