import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { createTodo, updateTodo, deleteTodo } from '../../api/todo'
import {
  Todo,
  CreateTodoProps,
  UpdateTodoProps,
  DeleteTodoProps,
} from '../../types/todo'

const useMutateTodo = () => {
  const useCreateTodo = (
    options?: UseMutationOptions<{ data: Todo }, Error, CreateTodoProps>,
  ) => {
    return useMutation(createTodo, options)
  }

  const useUpdateTodo = (
    options?: UseMutationOptions<{ data: Todo }, Error, UpdateTodoProps>,
  ) => {
    return useMutation(updateTodo, options)
  }

  const useDeleteTodo = (
    options?: UseMutationOptions<{ data: null }, Error, DeleteTodoProps>,
  ) => {
    return useMutation(deleteTodo, options)
  }

  return {
    useCreateTodo,
    useUpdateTodo,
    useDeleteTodo,
  }
}

export default useMutateTodo
