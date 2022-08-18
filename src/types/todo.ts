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
  authToken: string
}

export interface GetDeleteTodoProps {
  todoId: string
  authToken: string
}

export interface UpdateTodoProps extends CreateTodoProps {
  todoId: string
  authToken: string
}
