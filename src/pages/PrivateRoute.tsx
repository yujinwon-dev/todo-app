import { Navigate, Outlet } from 'react-router-dom'
import useTokenCheck from '../hooks/useTokenCheck'

export default function PrivateRoute() {
  const isValidToken = useTokenCheck()
  return isValidToken ? <Outlet /> : <Navigate to="/intro" />
}
