import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import { ResponseData, getTodos, createTodo } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'

export default function TodoForm() {
  const [, setTodos] = useAtom(todosAtom)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function tokenCheck() {
    if (!isValidToken) {
      alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
      navigate('/auth/login')
      return
    }
  }

  function handleCreateTodo() {
    tokenCheck()
    createTodo(title, content)
      .then(() => {
        setTitle('')
        setContent('')
        getTodos()
          .then(res => {
            const resValue = res as ResponseData
            setTodos(resValue.data)
          })
      })
  }
  return (
    <Form handleSubmit={handleCreateTodo}>
      <LabelsContainer>
        <Label htmlFor="title">
          <LabelSpan>제목</LabelSpan>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
          />
        </Label>
        <FormButton value="추가" disabled={false} />
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