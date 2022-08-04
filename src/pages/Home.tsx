import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import Form from '../components/Form'
import FormButton from '../components/FormButton'
import TodoItem from '../components/TodoItem'
import { ResponseData, getTodos, createTodo } from '../api/todo'
import { todosAtom } from '../atoms/todo'

interface Response {
  data: ResponseData[]
}

export default function Home() {
  const [todos, setTodos] = useAtom(todosAtom)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  useEffect(() => {
    getTodos()
      .then(res => {
        const resValue = res as Response
        setTodos(resValue.data)
      })
  }, [])

  function handleCreateTodo() {
    createTodo(title, content)
  }
  return (
    <div>
      <h1>Todo App</h1>
      <nav
        style={{
          paddingBottom: "1rem",
        }}
      >
        <Link to="/auth/login">Login</Link> |{" "}
        <Link to="/auth/signup">SignUp</Link>
      </nav>
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
        {todos.length > 0 && todos.map((todo: ResponseData) => (
          <TodoItem key={todo.id} id={todo.id} title={todo.title} content={todo.content} />
        ))}
      </ul>
    </div>
  )
}
