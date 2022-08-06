import { useAtom } from 'jotai'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Todo } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'
import LogoutButton from '../components/LogoutButton'

interface LocationState {
  currentTodo: Todo
}

export default function Detail() {
  const [todos] = useAtom(todosAtom)
  const { state } = useLocation()
  const { currentTodo } = state as LocationState

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
          <p>{currentTodo.title}</p>
          <p>{currentTodo.content}</p>
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
