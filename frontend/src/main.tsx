import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/auth/Login'
import { AuthProvider } from './context/AuthContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/auth/Register'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/register",
    element: <Register />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
