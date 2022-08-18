import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getTodos, getTodoById } from '../../api/todo'
import { Todo } from '../../types/todo'
import { useAuthToken } from '../useAuthToken'

const useTodo = () => {
  const { getToken } = useAuthToken()
  const authToken = getToken() || ''

  const useGetTodos = (options?: UseQueryOptions<{ data: Todo[] }, Error>) => {
    return useQuery<{ data: Todo[] }, Error>(
      ['get_todos'],
      () => getTodos(authToken),
      options,
    )
  }

  const useGetTodo = (
    todoId: string,
    options?: UseQueryOptions<{ data: Todo }, Error>,
  ) => {
    return useQuery<{ data: Todo }, Error>(
      ['get_todo', todoId],
      () => getTodoById({ todoId, authToken }),
      options,
    )
  }

  return {
    useGetTodos,
    useGetTodo,
  }
}

export default useTodo
