import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PrivateRoute from './pages/PrivateRoute'
import Home from './pages/Home'
import Intro from './pages/Intro'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Detail from './pages/Detail'

// const queryClient = new QueryClient()

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="intro" element={<Intro />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/:todoId" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </QueryClientProvider>
  )
}
