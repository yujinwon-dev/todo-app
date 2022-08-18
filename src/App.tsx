import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PrivateRoute from './pages/PrivateRoute'
import Home from './pages/Home'
import Intro from './pages/Intro'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Detail from './pages/Detail'
import { AxiosError } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import toastOptions from './utils/toastOptions'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.details, toastOptions)
      } else {
        toast.error('에러가 발생했습니다')
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.details, toastOptions)
      } else {
        toast.error('에러가 발생했습니다')
      }
    },
  }),
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="intro" element={<Intro />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}>
              <Route path=":todoId" element={<Detail />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
