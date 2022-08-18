import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getTodos, getTodoById  } from '../../api/todo'
import { Todo } from '../../types/todo'

const useTodo = () => {
  const useGetTodos = (options?: UseQueryOptions<{ data: Todo[] }, Error>) => {
    return useQuery<{ data: Todo[] }, Error>(['get_todos'], getTodos, options)
  }

  const useGetTodo = (
    todoId: string,
    options?: UseQueryOptions<{ data: Todo }, Error>
  ) => {
    return useQuery<{ data: Todo }, Error>(['get_todo', todoId], () => getTodoById(todoId), options)
  }

  return {
    useGetTodos,
    useGetTodo
  }
}

export default useTodo
