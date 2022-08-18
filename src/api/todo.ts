import apiInstance from './axios'
import { Todo, CreateTodoProps, UpdateTodoProps, DeleteTodoProps } from '../types/todo'

export const getTodos = async (): Promise<{ data: Todo[] }> => {
  const { data } = await apiInstance.get('/todos')
  return data
}

export const getTodoById = async (todoId: string): Promise<{ data: Todo }> => {
  const { data } = await apiInstance.get(`/todos/${todoId}`)
  return data
}

export const createTodo = async ({ title, content }: CreateTodoProps): Promise<{ data: Todo }> => {
  const { data } = await apiInstance.post('/todos', { title, content })
  return data
}

export const updateTodo = async ({ todoId, title, content }: UpdateTodoProps): Promise<{ data: Todo }>  => {
  const { data } = await apiInstance.put(`/todos/${todoId}`, { title, content })
  return data
}

export const deleteTodo = async ({ todoId }: DeleteTodoProps): Promise<{ data: null }> => {
  const { data } = await apiInstance.delete(`/todos/${todoId}`)
  return data
}
