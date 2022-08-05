import { useState } from 'react'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import Form from './Form'
import FormButton from './FormButton'
import { deleteTodo, ResponseData, Todo, updateTodo } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'
import { useNavigate } from 'react-router-dom'

export default function TodoItem({ id, title, content }: {
  id: string,
  title: string,
  content: string,
}) {
  const [todos, setTodos] = useAtom(todosAtom)
  const [editMode, setEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState(title)
  const [inputContent, setInputContent] = useState(content)
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
    updateTodo(id, inputTitle, inputContent)
      .then(res => {
        const { data } = res as ResponseData
        const newTodos = todos.map(todo => {
          if (todo.id === id) {
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
    deleteTodo(id)
      .then(() => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos as Todo[])
      })
  }

  return (
    <Li>
      {editMode ? (
        <Form handleSubmit={handleUpdateTodo}>
          <label htmlFor="title">
            제목
            <input
              type="text"
              name="title"
              value={inputTitle}
              onChange={e => setInputTitle(e.target.value)}
              />
          </label>
          <label htmlFor="content">
            내용
            <textarea
              name="content"
              value={inputContent}
              onChange={e => setInputContent(e.target.value)}
            />
          </label>
          <FormButton value="수정" disabled={false} />
          <Button type="button" onClick={() => setEditMode(false)}>취소</Button>
        </Form>
      ) : (
        <>
          <p>{title}</p>
          <span>{content}</span>
          <div>
            <Button onClick={() => {
              tokenCheck()
              setEditMode(true)
            }}>수정</Button>
            <Button onClick={() => {
              tokenCheck()
              handleDeleteTodo()
            }}>삭제</Button>
          </div>
        </>
      )}
    </Li>
  )
}

const Li = styled.li`
  width: 400px;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  margin: 1rem;
`
const Button = styled.button`
  cursor: pointer;
`
