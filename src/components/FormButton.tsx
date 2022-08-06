import styled from 'styled-components'

export default function FormButton({ value, disabled } : {
  value: string,
  disabled: boolean,
}) {
  return (
    <Button type="submit" disabled={disabled}>{value}</Button>
  )
}

const Button = styled.button`
  width: 150px;
  color: #383838;
  font-weight: bold;
  background-color: #9be8d6;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 0.5rem auto;
  cursor: pointer;

  &:disabled {
    background-color: #c8c8c8;
  }
`
