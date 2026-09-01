import React, { useState, useEffect } from 'react'

export default function Navbar({ onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          {/* Brand Logo */}
          <a className="brand-logo" href="#">
            <div className="logo-badge">
              <i className="bi bi-bank2"></i>
            </div>
            <span className="brand-title">
              Judicial<span className="brand-highlight">GPT</span>
            </span>
          </a>

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

          {/* Navigation Links (Matching Screenshot Header) */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarMain">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-1">
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#how-it-works">How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#ai-tools">AI Tools</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#team">Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#about">About</a>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <button className="btn-sign-in" onClick={onOpenModal}>
              Sign In
            </button>
            <button className="btn-header-cta" onClick={onOpenModal}>
              Get Started Free
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
