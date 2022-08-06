import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import TodoItem from '../components/TodoItem'
import { Todo, ResponseData, getTodos } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'
import styled from 'styled-components'
import TodoForm from '../components/TodoForm'

export default function Home() {
  const [todos, setTodos] = useAtom(todosAtom)
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function tokenCheck() {
    if (!isValidToken) {
      alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
      navigate('/auth/login')
      return
    }
  }
  
  useEffect(() => {
    tokenCheck()
    getTodos()
      .then(res => {
        const resValue = res as ResponseData
        setTodos(resValue.data)
      })
  }, [])
  
  return (
    <Page>
      <H1>Todo App</H1>
      <TodoForm />
      <Ul>
        {todos && todos.length > 0 && todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            currentTodo={todo}
          />
        ))}
      </Ul>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
`

const H1 = styled.h1`
  margin: 1rem 0;
`

const Ul = styled.ul`
  list-style-type: none;
`
