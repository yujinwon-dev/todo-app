export interface Todo {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}

export interface CreateTodoProps {
  title: string
  content: string
}

export interface DeleteTodoProps {
  todoId: string
}

export interface UpdateTodoProps extends CreateTodoProps {
  todoId: string
}
