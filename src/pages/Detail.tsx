import { useState } from 'react'
import { useAtom } from 'jotai'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { todosAtom } from '../atoms/todo'
import TodoForm from '../components/todo/TodoForm'
import TodoItem from '../components/todo/TodoItem'
import LogoutButton from '../components/common/LogoutButton'
import { Todo, getTodoById } from '../api/todo'
import { useEffect } from 'react'

const emptyTodo = {
  title: '',
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
}

export default function Detail() {
  const [currentTodo, setCurrentTodo] = useState(emptyTodo)
  const [todos] = useAtom(todosAtom)
  const { todoId } = useParams()
  const navigate = useNavigate()

  async function handleGetTodo() {
    try {
      const { data } = await getTodoById(todoId || '')
      setCurrentTodo(data)
    } catch (error) {
      alert('할 일을 불러올 수 없습니다.')
      navigate('/')
    }
  }

  useEffect(() => {
    handleGetTodo()
  }, [todoId, todos])

  return (
    <Page>
      <DetailItem>
        <H2>{currentTodo.title}</H2>
        <Content>{currentTodo.content}</Content>
        <p>작성일: {currentTodo.createdAt.split('T')[0]}</p>
        <p>수정일: {currentTodo.updatedAt.split('T')[0]}</p>
      </DetailItem>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
`

const H2 = styled.h2`
  margin: 1rem 0;
`

const Content = styled.p`
  margin-bottom: 1rem;
`

const DetailItem = styled.div`
  width: 250px;
  height: 100%;
  padding: 1rem;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  margin: 1rem;
`
