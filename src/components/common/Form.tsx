import { ReactNode } from 'react'
import styled from 'styled-components'

export default function Form({
  handleSubmit,
  children,
}: {
  handleSubmit: () => void
  children: ReactNode
}) {
  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      {children}
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin: 1rem;
`
