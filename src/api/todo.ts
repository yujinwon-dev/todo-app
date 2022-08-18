import apiInstance from './axios'

export interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoProps {
  title: string;
  content: string;
}

export interface DeleteTodoProps {
  todoId: string
}

export interface UpdateTodoProps extends CreateTodoProps, DeleteTodoProps{}

export const getTodos = async () => {
  const { data } = await apiInstance.get('/todos')
  return data
}

export const getTodoById = async (todoId: string) => {
  const { data } = await apiInstance.get(`/todos/${todoId}`)
  return data
}

export const createTodo = async ({ title, content }: CreateTodoProps) => {
  const { data } = await apiInstance.post('/todos', { title, content })
  return data
}

export const updateTodo = async ({ todoId, title, content }: UpdateTodoProps)  => {
  const { data } = await apiInstance.put(`/todos/${todoId}`, { title, content })
  return data
}

export const deleteTodo = async (todoId: DeleteTodoProps) => {
  const { data } = await apiInstance.delete(`/todos/${todoId}`)
  return data
}
