import apiInstance from './axios';

export interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoData {
  data: Todo
}

export interface TodosData {
  data: Todo[]
}

export const getTodos = async (): Promise<TodosData> => {
  const { data } = await apiInstance.get('/todos')
  return data
}

export const getTodoById = async (id: string): Promise<TodoData> => {
  const { data } = await apiInstance.get(`/todos/${id}`)
  return data
}


export const createTodo = async (title: string, content: string): Promise<TodoData> => {
  const { data } = await apiInstance.post('/todos', { title, content })
  return data
}

export const updateTodo = async (id: string, title: string, content: string): Promise<TodoData>  => {
  const { data } = await apiInstance.put(`/todos/${id}`, { title, content })
  return data
}

export const deleteTodo = async (id: string): Promise<{ data: null }> => {
  const { data } = await apiInstance.delete(`/todos/${id}`)
  return data
}
