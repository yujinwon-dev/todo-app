import { Outlet, Link } from 'react-router-dom'
import TodoItem from '../components/todo/TodoItem'
import { Todo } from '../types/todo'
import styled from 'styled-components'
import TodoForm from '../components/todo/TodoForm'
import LogoutButton from '../components/common/LogoutButton'
import useTodo from '../hooks/queries/useTodo'
import Loader from '../components/common/Loader'

export default function Home() {
  const { useGetTodos } = useTodo()
  const { status, data } = useGetTodos()

  return (
    <Page>
      <HeaderWrapper>
        <StyledLink to="/">
          <H1>Todo App</H1>
        </StyledLink>
        <LogoutButton />
      </HeaderWrapper>
      <OutletContainer>
        <div>
          <TodoForm />
          {status === 'loading' ? (
            <Loader />
          ) : (
            data && (
              <Ul>
                {data.data &&
                  data.data.length > 0 &&
                  data.data.map((todo: Todo) => (
                    <TodoItem key={todo.id} currentTodo={todo} />
                  ))}
              </Ul>
            )
          )}
        </div>
        <Outlet />
      </OutletContainer>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

const H1 = styled.h1`
  margin: 1rem 0;
`

const OutletContainer = styled.div`
  display: flex;
`

const Ul = styled.ul`
  list-style-type: none;
`
