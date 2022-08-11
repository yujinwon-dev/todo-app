import { useState } from 'react'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { todosAtom } from '../atoms/todo'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'
import LogoutButton from '../components/LogoutButton'
import { Todo, getTodoById } from '../api/todo'
import { useEffect } from 'react'

export default function Detail() {
  const [currentTodo, setCurrentTodo] = useState({
    title: '',
    content: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  })
  const [todos] = useAtom(todosAtom)
  const { todoId } = useParams()

  async function handleGetTodo() {
    try {
      const { data } = await getTodoById(todoId || '')
      setCurrentTodo(data)
    } catch (error) {
      alert('할 일을 불러올 수 없습니다.')
    }
  }

  useEffect(() => {
    handleGetTodo()
  }, [todoId])

  return (
    <Page>
      <HeaderWrapper>
        <H1>Todo App</H1>
        <LogoutButton />
      </HeaderWrapper>
      <ListDetailContainer>    
        <div>
          <TodoForm />
          <Ul>
            {todos && todos.length > 0 && todos.map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                currentTodo={todo}
              />
            ))}
          </Ul>
        </div>
        <DetailItem>
          <H2>{currentTodo.title}</H2>
          <Content>{currentTodo.content}</Content>
          <p>작성일: {currentTodo.createdAt.split('T')[0]}</p>
          <p>수정일: {currentTodo.updatedAt.split('T')[0]}</p>
        </DetailItem>
      </ListDetailContainer>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const H1 = styled.h1`
  margin: 1rem 0;
`

const H2 = styled.h2`
  margin: 1rem 0;
`

const Content = styled.p`
  margin-bottom: 1rem;
`

const ListDetailContainer = styled.div`
  display: flex;  
`

const Ul = styled.ul`
  list-style-type: none;
`

const DetailItem = styled.div`
  width: 250px;
  padding: 1rem;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  margin: 1rem;
`
