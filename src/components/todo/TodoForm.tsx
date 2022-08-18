import { useState } from 'react'
import styled from 'styled-components'
import Form from '../common/Form'
import SubmitButton from '../common/SubmitButton'
import useMutateTodo from '../../hooks/queries/useMutateTodo'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthToken } from '../../hooks/useAuthToken'
import { useNavigate } from 'react-router-dom'

export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const { getToken } = useAuthToken()
  const authToken = getToken() || ''
  const queryClient = useQueryClient()
  const { useCreateTodo } = useMutateTodo()
  const { mutate: createTodo } = useCreateTodo({
    onSuccess: () => {
      setTitle('')
      setContent('')
      queryClient.invalidateQueries(['get_todos'])
    },
    onError: () => navigate('/intro'),
  })

  function handleFormSubmit() {
    createTodo({ title, content, authToken })
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
  background-color: #f6f8fa;

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
  background-color: #f6f8fa;
`

const ButtonWrapper = styled.div`
  text-align: right;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
`
