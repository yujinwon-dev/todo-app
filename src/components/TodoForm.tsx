import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import Form from '../components/Form'
import SubmitButton from './SubmitButton'
import { getTodos, createTodo } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'

export default function TodoForm() {
  const [todos, setTodos] = useAtom(todosAtom)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function goToLogin() {
    alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
    navigate('/auth/login')
  }

  // THOUGHT: handleGetTodos 함수를 훅 or utils로 뺄까 고민 중
  async function handleGetTodos() {
    try {
      const { data } = await getTodos()
      setTodos(data)
    } catch (error) {
      alert('할 일 목록을 가져올 수 없습니다.')
    }
  }

  async function handleCreateTodo() {
    try {
      // create 시 리턴값이 없어서 다시 get 요청 보내는 코드 유지
      const responseData = await createTodo(title, content)
      setTitle('')
      setContent('')
      handleGetTodos()
    } catch (error) {
      alert('할 일을 생성할 수 없습니다.')
    }
  }

  function handleFormSubmit() {
    if (!isValidToken) {
      goToLogin()
      return
    }
    handleCreateTodo()
  }

  return (
    <Form handleSubmit={handleFormSubmit}>
      <LabelsContainer>
        <Label htmlFor="title">
          <LabelSpan>제목</LabelSpan>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            />
        </Label>
        <Label htmlFor="content">
        <LabelSpan>내용</LabelSpan>
          <Textarea
            id="content"
            name="content"
            rows={5}
            cols={30}
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </Label>
        <ButtonWrapper>
          <SubmitButton value="추가" disabled={false} />
        </ButtonWrapper>
      </LabelsContainer>
    </Form>
  )
}

const LabelsContainer = styled.div`
  width: 350px;
  background-color: #e3e3e3;
  padding: 0.5rem;
  border-radius: 5px;
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
  border: none;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  background-color: #F6F8FA;
  
  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
  `

const Textarea = styled.textarea`
  padding: 0 1rem;
  border-radius: 5px;
  border: none;
  margin-right: 0.5rem;
  background-color: #F6F8FA;
`

const ButtonWrapper = styled.div`
  text-align: right;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
`
