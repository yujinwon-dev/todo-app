import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <nav
        style={{
          paddingBottom: "1rem",
        }}
      >
        <Link to="/auth/login">Login</Link> |{" "}
        <Link to="/auth/signup">SignUp</Link>
      </nav>
    </div>
  )
}
