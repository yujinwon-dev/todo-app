import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <Page>
      <HeadingContainer>
        <H1>404</H1>
        <H1>404</H1>
      </HeadingContainer>
      <h2>Page Not Found</h2>
      <p>
        찾으시는 페이지가 존재하지 않습니다. <br />
        아래에 있는 버튼을 클릭하시면 홈페이지로 돌아갑니다.
      </p>
      <Button onClick={() => navigate('/')}>HOME</Button>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  line-height: 1.5;
`

const HeadingContainer = styled.div`
  position: relative;
`

const H1 = styled.h1`
  color: #fff;
  font-size: 5rem;
  position: absolute;
  top: -50px;
  transform: translate(-50%, -50%);

  &:nth-child(1) {
    color: transparent;
    -webkit-text-stroke: 2px #2c8fec;
  }

  &:nth-child(2) {
    color: #2c8fec;
    animation: wave 4s ease-in-out infinite;
  }

  @keyframes wave {
    0%,
    100% {
      clip-path: polygon(
        0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%
      );
    }

    50% {
      clip-path: polygon(
        0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%
      );
    }
  }
`

const Button = styled.button`
  background: transparent;
  color: #000;
  font-weight: bold;
  padding: 8px 50px;
  border: 4px solid #2c8fec;
  border-radius: 30px;
  margin: 1rem;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #2c8fec;
  }
`
