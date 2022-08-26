import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Form from '../common/Form'
import { Todo } from '../../types/todo'
import useMutateTodo from '../../hooks/queries/useMutateTodo'
import { useAuthToken } from '../../hooks/useAuthToken'
import todoKeys from '../../hooks/queries/keys/todoKeys'

export default function TodoItem({ currentTodo }: { currentTodo: Todo }) {
  const [editMode, setEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState(currentTodo.title)
  const [inputContent, setInputContent] = useState(currentTodo.content)
  const navigate = useNavigate()
  const { getToken } = useAuthToken()
  const authToken = getToken() || ''
  const queryClient = useQueryClient()
  const { useUpdateTodo, useDeleteTodo } = useMutateTodo()
  const { mutate: updateTodo } = useUpdateTodo({
    onSuccess: () =>
      queryClient.invalidateQueries(todoKeys.detail(currentTodo.id)),
    onError: () => navigate('/intro'),
  })
  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      queryClient.invalidateQueries(todoKeys.all)
      queryClient.invalidateQueries(todoKeys.detail(currentTodo.id))
    },
    onError: () => navigate('/intro'),
  })

  function handleClickDelete() {
    deleteTodo({ todoId: currentTodo.id, authToken })
  }

  function handleFormSubmit() {
    updateTodo({
      todoId: currentTodo.id,
      title: inputTitle,
      content: inputContent,
      authToken,
    })
    setEditMode(false)
  }

  return (
    <Li>
      {editMode ? (
        <Form handleSubmit={handleFormSubmit}>
          <LabelsContainer>
            <Label htmlFor="title">
              <LabelSpan>제목</LabelSpan>
              <Input
                type="text"
                id="title"
                name="title"
                value={inputTitle}
                onChange={e => setInputTitle(e.target.value)}
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
                value={inputContent}
                onChange={e => setInputContent(e.target.value)}
                required
              />
            </Label>
          </LabelsContainer>
          <ButtonsContainer>
            <UpdateButton type="submit">수정</UpdateButton>
            <UpdateButton type="button" onClick={() => setEditMode(false)}>
              취소
            </UpdateButton>
          </ButtonsContainer>
        </Form>
      ) : (
        <>
          <TodoTitleWrapper onClick={() => navigate(`/${currentTodo.id}`)}>
            <TodoTitle>{currentTodo.title}</TodoTitle>
          </TodoTitleWrapper>
          <div>
            <UpdateButton onClick={() => setEditMode(true)}>수정</UpdateButton>
            <DeleteButton onClick={() => handleClickDelete()}>
              삭제
            </DeleteButton>
          </div>
        </>
      )}
    </Li>
  )
}

const Li = styled.li`
  width: 350px;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  margin: 1rem;
`

const TodoTitleWrapper = styled.div`
  cursor: pointer;
`

const TodoTitle = styled.p`
  line-height: 1.5;
  margin: 1rem;
`

const LabelsContainer = styled.div`
  padding-bottom: 0.5rem;
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
  background-color: #e8e8e8;

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
  background-color: #e8e8e8;
`

const ButtonsContainer = styled.div`
  display: flex;
`

const DeleteButton = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9be8d6;
  }
`

const UpdateButton = styled(DeleteButton)`
  margin: 0 1rem 1rem 1rem;
`
