import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import TodoItem from '../components/todo/TodoItem'
import { Todo, getTodos } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'
import styled from 'styled-components'
import TodoForm from '../components/todo/TodoForm'
import LogoutButton from '../components/common/LogoutButton'

export default function Home() {
  const [todos, setTodos] = useAtom(todosAtom)
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function navigateToLogin() {
    alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
    navigate('/auth/login')
  }
  
  async function handleGetTodos() {
    try {
      const { data } = await getTodos()
      setTodos(data)
    } catch (error) {
      alert('할 일 목록을 가져올 수 없습니다.')
    }
  }

  useEffect(() => {
    if (!isValidToken) {
      navigateToLogin()
      return
    }
    handleGetTodos()
  }, [])
  
  return (
    <Page>
      <HeaderWrapper>
        <H1>Todo App</H1>
        <LogoutButton />
      </HeaderWrapper>
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

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const H1 = styled.h1`
  margin: 1rem 0;
`

const Ul = styled.ul`
  list-style-type: none;
`
