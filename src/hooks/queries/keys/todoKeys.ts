const todoKeys = {
  all: ['get_todos' as const],
  detail: (id: string) => ['get_todo', id] as const,
}

export default todoKeys
