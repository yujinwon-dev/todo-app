import { ReactNode } from "react"
import styled from "styled-components"

export default function Form({ children } : {
  children: ReactNode
}) {
  return (
    <StyledForm>{children}</StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: column wrap;
`
