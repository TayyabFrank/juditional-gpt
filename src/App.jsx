import React, { useState } from 'react'
import './App.css'

// Components
import Navbar from './components/Navbar'
import BackgroundGlow from './components/BackgroundGlow'
import AssistantModal from './components/AssistantModal'
import Footer from './components/Footer'
import Home from './pages/Home/Home'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <div className="judicial-app min-vh-100 d-flex flex-column justify-content-between">
      {/* Background Glow, Scales of Justice & Cyber Legal Icons */}
      <BackgroundGlow />

      {/* Top Navbar matching screenshot */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* The Requested Page */}
      <main className="flex-grow-1">
        <Home onOpenModal={handleOpenModal} />
      </main>

      {/* Live AI Assistant Modal */}
      <AssistantModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
