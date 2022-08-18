import apiInstance from './axios'
import {
  Todo,
  CreateTodoProps,
  UpdateTodoProps,
  GetDeleteTodoProps,
} from '../types/todo'

export const getTodos = async (
  authToken: string,
): Promise<{ data: Todo[] }> => {
  const { data } = await apiInstance.get('/todos', {
    headers: {
      Authorization: authToken,
    },
  })
  return data
}

export const getTodoById = async ({
  todoId,
  authToken,
}: GetDeleteTodoProps): Promise<{ data: Todo }> => {
  const { data } = await apiInstance.get(`/todos/${todoId}`, {
    headers: {
      Authorization: authToken,
    },
  })
  return data
}

export const createTodo = async ({
  title,
  content,
  authToken,
}: CreateTodoProps): Promise<{ data: Todo }> => {
  const { data } = await apiInstance.post(
    '/todos',
    { title, content },
    {
      headers: {
        Authorization: authToken,
      },
    },
  )
  return data
}

export const updateTodo = async ({
  todoId,
  title,
  content,
  authToken,
}: UpdateTodoProps): Promise<{ data: Todo }> => {
  const { data } = await apiInstance.put(
    `/todos/${todoId}`,
    { title, content },
    {
      headers: {
        Authorization: authToken,
      },
    },
  )
  return data
}

export const deleteTodo = async ({
  todoId,
  authToken,
}: GetDeleteTodoProps): Promise<{ data: null }> => {
  const { data } = await apiInstance.delete(`/todos/${todoId}`, {
    headers: {
      Authorization: authToken,
    },
  })
  return data
}
