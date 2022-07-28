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
  color: #fff;
  font-weight: bold;
  background-color: #61A8FF;

  &:disabled {
    background-color: #c8c8c8;
  }
`
