import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './App.css'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'

// Components
import Navbar from './components/Navbar'
import BackgroundGlow from './components/BackgroundGlow'
import ParticleCanvas from './components/ParticleCanvas'
import AssistantModal from './components/AssistantModal'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Assistant from './pages/Assistant/Assistant'

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function MainAppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isWorkspace = location.pathname === '/assistant'

  const handleOpenAssistant = () => {
    if (isAuthenticated) {
      navigate('/assistant')
    } else {
      navigate('/signup', { state: { from: { pathname: '/assistant' } } })
    }
  }

  const handleCloseModal = () => setIsModalOpen(false)

  if (isWorkspace) {
    return <Assistant />
  }

  return (
    <div className="judicial-app min-vh-100 d-flex flex-column justify-content-between">
      {/* Interactive 3D Neural Particle Constellation Layer */}
      <ParticleCanvas />

      {/* Background Glow, Scales of Justice & Cyber Legal Icons */}
      <BackgroundGlow />

      {/* Top Navbar */}
      <Navbar onOpenModal={handleOpenAssistant} />

      {/* Dynamic Route Pages */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home onOpenModal={handleOpenAssistant} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Live AI Assistant Modal (Fallback) */}
      <AssistantModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <MainAppLayout />
    </AuthProvider>
  )
}
