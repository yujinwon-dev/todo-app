import { useState } from 'react'
import styled from 'styled-components'
import Form from './Form'
import FormButton from './FormButton'

export default function TodoItem({ id, title, content }: {
  id: string,
  title: string,
  content: string,
}) {
  const [editMode, setEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState(title)
  const [inputContent, setInputContent] = useState(content)
  function handleUpdateTodo() {

  }
  return (
    <Li>
      {editMode ? (
        <Form handleSubmit={handleUpdateTodo}>
          <label htmlFor="title">
            제목
            <input
              type="text"
              name="title"
              value={inputTitle}
              onChange={e => setInputTitle(e.target.value)}
              />
          </label>
          <label htmlFor="content">
            내용
            <textarea
              name="content"
              value={inputContent}
              onChange={e => setInputContent(e.target.value)}
            />
          </label>
          <FormButton value="수정" disabled={false} />
        </Form>
      ) : (
        <>
          <p>{title}</p>
          <span>{content}</span>
          <div>
            <Button onClick={() => setEditMode(true)}>수정</Button>
            <Button>삭제</Button>
          </div>
        </>
      )}
    </Li>
  )
}

const Li = styled.li`
  width: 40%;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
`
const Button = styled.button`
  cursor: pointer;
`