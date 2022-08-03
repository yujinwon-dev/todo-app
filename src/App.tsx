import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

// const queryClient = new QueryClient()

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    // </QueryClientProvider>
  )
}
