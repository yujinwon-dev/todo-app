import { atomWithStorage } from 'jotai/utils'
import { Todo } from '../api/todo'

export const todosAtom = atomWithStorage<Todo[] | []>('todos', [])
