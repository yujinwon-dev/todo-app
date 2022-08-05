import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import TodoItem from '../components/TodoItem'
import { Todo, ResponseData, getTodos, createTodo } from '../api/todo'
import { todosAtom } from '../atoms/todo'
import useTokenCheck from '../hooks/useTokenCheck'

export default function Home() {
  const [todos, setTodos] = useAtom(todosAtom)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const navigate = useNavigate()
  const isValidToken = useTokenCheck()

  function tokenCheck() {
    if (!isValidToken) {
      alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
      navigate('/auth/login')
      return
    }
  }

  function getSetTodos() {
    getTodos()
    .then(res => {
      const resValue = res as ResponseData
      setTodos(resValue.data)
    })
  }
  
  useEffect(() => {
    tokenCheck()
    getSetTodos()
  }, [])
  
  function handleCreateTodo() {
    tokenCheck()
    createTodo(title, content)
      .then(() => {
        getSetTodos()
      })
  }
  
  return (
    <div>
      <h1>Todo App</h1>
      <Form handleSubmit={handleCreateTodo}>
        <label htmlFor="title">
          제목
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
        </label>
        <label htmlFor="content">
          내용
          <textarea
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </label>
        <FormButton value="추가" disabled={false} />
      </Form>
      <ul>
        {todos && todos.length > 0 && todos.map((todo: Todo) => (
          <TodoItem key={todo.id} id={todo.id} title={todo.title} content={todo.content} />
        ))}
      </ul>
    </div>
  )
}
