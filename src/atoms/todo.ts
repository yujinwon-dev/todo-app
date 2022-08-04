import { atomWithStorage } from 'jotai/utils'
import { ResponseData } from '../api/todo'

export const todosAtom = atomWithStorage<ResponseData[]>('todos', [])
