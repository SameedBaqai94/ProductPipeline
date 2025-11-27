import './App.css'
import { ProtectedRoute } from './component/route/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { ItemFormPage } from './pages/ItemFormPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
        />
        <Route path="/itemform" element={
          <ProtectedRoute>
            <ItemFormPage />
          </ProtectedRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
