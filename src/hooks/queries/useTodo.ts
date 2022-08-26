import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getTodos, getTodoById } from '../../api/todo'
import { Todo } from '../../types/todo'
import { useAuthToken } from '../useAuthToken'
import todoKeys from './keys/todoKeys'

const useTodo = () => {
  const { getToken } = useAuthToken()
  const authToken = getToken() || ''

  const useGetTodos = (options?: UseQueryOptions<{ data: Todo[] }, Error>) => {
    return useQuery<{ data: Todo[] }, Error>(
      todoKeys.all,
      () => getTodos(authToken),
      options,
    )
  }

  const useGetTodo = (
    todoId: string,
    options?: UseQueryOptions<{ data: Todo }, Error>,
  ) => {
    return useQuery<{ data: Todo }, Error>(
      todoKeys.detail(todoId),
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
