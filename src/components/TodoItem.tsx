import { useState } from 'react'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import Form from './Form'
import { deleteTodo, ResponseData, Todo, updateTodo } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'
import { useNavigate } from 'react-router-dom'

export default function TodoItem({ currentTodo }: {
  currentTodo: Todo,
}) {
  const [todos, setTodos] = useAtom(todosAtom)
  const [editMode, setEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState(currentTodo.title)
  const [inputContent, setInputContent] = useState(currentTodo.content)
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function tokenCheck() {
    if (!isValidToken) {
      alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
      navigate('/auth/login')
      return
    }
  }

  function handleUpdateTodo() {
    updateTodo(currentTodo.id, inputTitle, inputContent)
      .then(res => {
        const { data } = res as ResponseData
        const newTodos = todos.map(todo => {
          if (todo.id === currentTodo.id) {
            return data
          } else {
            return todo
          }
        })
        setTodos(newTodos as Todo[])
        setEditMode(false)
      })
  }

  function handleDeleteTodo() {
    deleteTodo(currentTodo.id)
      .then(() => {
        const newTodos = todos.filter(todo => todo.id !== currentTodo.id)
        setTodos(newTodos as Todo[])
      })
  }

  return (
    <Li>
      {editMode ? (
        <Form handleSubmit={handleUpdateTodo}>
          <LabelsContainer>
            <Label htmlFor="title">
              <LabelSpan>제목</LabelSpan>
              <Input
                type="text"
                id="title"
                name="title"
                value={inputTitle}
                onChange={e => setInputTitle(e.target.value)}
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
              />
            </Label>
          </LabelsContainer>
          <ButtonsContainer>
            <UpdateButton type="submit">수정</UpdateButton>
            <UpdateButton type="button" onClick={() => setEditMode(false)}>취소</UpdateButton>
          </ButtonsContainer>
        </Form>
      ) : (
        <>
          <div onClick={() => navigate(`/${currentTodo.id}`, { state: { currentTodo }})}>
            <TodoTitle>{currentTodo.title}</TodoTitle>
          </div>
          <div>
            <UpdateButton onClick={() => {
              tokenCheck()
              setEditMode(true)
            }}>수정</UpdateButton>
            <DeleteButton onClick={() => {
              tokenCheck()
              handleDeleteTodo()
            }}>삭제</DeleteButton>
          </div>
        </>
      )}
    </Li>
  )
}

const Li = styled.li`
  width: 350px;
  padding: 0.5rem;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  margin: 1rem;
`

const TodoTitle = styled.p`
  line-height: 1.5;
`

const LabelsContainer = styled.div`
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
  margin-right: 1rem;
`
