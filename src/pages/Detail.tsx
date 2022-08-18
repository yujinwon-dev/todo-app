import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useTodo from '../hooks/queries/useTodo'
import Loader from '../components/common/Loader'
import { AxiosError } from 'axios'

export default function Detail() {
  const { todoId } = useParams()
  const navigate = useNavigate()
  const { useGetTodo } = useTodo()
  const { status, data, error, isFetching } = useGetTodo(todoId || '', {
    enabled: !!todoId,
    onError: error => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.details)
        navigate('/')
      }
    },
  })

  return (
    <Page>
      {status === 'loading' ? (
        <Loader />
      ) : (
        data && (
          <DetailItem>
            <H2>{data.data.title}</H2>
            <Content>{data.data.content}</Content>
            <p>작성일: {data.data.createdAt.split('T')[0]}</p>
            <p>수정일: {data.data.updatedAt.split('T')[0]}</p>
          </DetailItem>
        )
      )}
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const H2 = styled.h2`
  margin: 1rem 0;
`

const Content = styled.p`
  margin-bottom: 1rem;
`

const DetailItem = styled.div`
  width: 250px;
  height: 100%;
  padding: 1rem;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  margin: 1rem;
`
