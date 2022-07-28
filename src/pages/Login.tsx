import { useEffect, useState } from 'react'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import { emailRule } from '../utils/formInputRule'

export default function Login() {
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
  return (
    <>
      <h1>Login</h1>
      <Form>
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
