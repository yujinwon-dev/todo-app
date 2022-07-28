import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
