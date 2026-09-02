import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavAnchor = (hash) => {
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          {/* Brand Logo */}
          <Link className="brand-logo" to="/">
            <div className="logo-badge">
              <i className="bi bi-bank2"></i>
            </div>
            <span className="brand-title">
              Judicial<span className="brand-highlight">GPT</span>
            </span>
          </Link>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarMain">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-1">
              <li className="nav-item">
                <a
                  className="nav-link nav-link-custom"
                  href="/#features"
                  onClick={(e) => { e.preventDefault(); handleNavAnchor('#features') }}
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link nav-link-custom"
                  href="/#how-it-works"
                  onClick={(e) => { e.preventDefault(); handleNavAnchor('#how-it-works') }}
                >
                  How It Works
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link nav-link-custom"
                  href="/#ai-tools"
                  onClick={(e) => { e.preventDefault(); handleNavAnchor('#ai-tools') }}
                >
                  AI Tools
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link nav-link-custom"
                  href="/#team"
                  onClick={(e) => { e.preventDefault(); handleNavAnchor('#team') }}
                >
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link nav-link-custom"
                  href="/#about"
                  onClick={(e) => { e.preventDefault(); handleNavAnchor('#about') }}
                >
                  About
                </a>
              </li>
            </ul>

            {/* Mobile Actions Drawer */}
            <div className="d-lg-none mt-3 pt-3 border-top d-flex flex-column gap-2">
              {isAuthenticated ? (
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-light">
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                      {currentUser?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>{currentUser?.name}</div>
                      <small className="text-muted">{currentUser?.role}</small>
                    </div>
                  </div>
                  <button className="btn btn-outline-success btn-sm w-100" onClick={onOpenModal}>
                    <i className="bi bi-robot me-1"></i> Open Assistant
                  </button>
                  <button className="btn btn-outline-danger btn-sm w-100" onClick={logout}>
                    <i className="bi bi-box-arrow-right me-1"></i> Sign Out
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm flex-fill" onClick={() => navigate('/login')}>
                    Sign In
                  </button>
                  <button className="btn btn-success btn-sm flex-fill" onClick={() => navigate('/signup')}>
                    Get Started Free
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-sm rounded-pill px-3 py-1 fw-semibold d-flex align-items-center gap-2"
                  style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                  onClick={onOpenModal}
                >
                  <i className="bi bi-robot"></i>
                  <span>AI Assistant</span>
                </button>

                <div className="dropdown">
                  <button
                    className="btn border-0 p-1 d-flex align-items-center gap-2 dropdown-toggle"
                    type="button"
                    id="userProfileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ background: 'transparent' }}
                  >
                    <div
                      className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        width: '38px',
                        height: '38px',
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        fontSize: '0.92rem'
                      }}
                    >
                      {currentUser?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="text-start d-none d-xl-block">
                      <div className="fw-bold text-dark" style={{ fontSize: '0.86rem', lineHeight: '1.2' }}>
                        {currentUser?.name}
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                        {currentUser?.role}
                      </div>
                    </div>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2" aria-labelledby="userProfileDropdown" style={{ minWidth: '220px' }}>
                    <li className="px-3 py-2 border-bottom">
                      <div className="fw-bold text-dark">{currentUser?.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.78rem' }}>{currentUser?.email}</div>
                      <span className="badge bg-success bg-opacity-10 text-success mt-1" style={{ fontSize: '0.7rem' }}>
                        {currentUser?.role}
                      </span>
                    </li>
                    <li>
                      <button className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 mt-1" onClick={onOpenModal}>
                        <i className="bi bi-robot text-success"></i>
                        <span>Chamber AI Assistant</span>
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-danger" onClick={logout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <button className="btn-sign-in" onClick={() => navigate('/login')}>
                  Sign In
                </button>
                <button className="btn-header-cta" onClick={() => navigate('/signup')}>
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
