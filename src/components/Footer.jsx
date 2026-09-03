import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const handleNavAnchor = (hash) => {
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLaunchAssistant = () => {
    if (isAuthenticated) {
      navigate('/assistant')
    } else {
      navigate('/signup', { state: { from: { pathname: '/assistant' } } })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="app-footer">
      <div className="container">
        {/* Top Interactive Mobile & Desktop Quick Callout Banner */}
        <div className="footer-cta-card mb-5">
          <div className="row align-items-center g-3">
            <div className="col-lg-7 text-center text-lg-start">
              <div className="footer-cta-tag">
                <span className="live-pulse-dot"></span>
                <span>Pakistan's 1st Judicial Intelligence Engine</span>
              </div>
              <h3 className="footer-cta-title">
                Ready to accelerate case research and precedent discovery?
              </h3>
              <p className="footer-cta-subtitle mb-0">
                Instantly search 50+ years of Supreme Court & High Court judgments in English, Urdu, and regional languages.
              </p>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-end gap-2">
                <button
                  className="btn-footer-primary"
                  onClick={handleLaunchAssistant}
                >
                  <i className="bi bi-stars"></i>
                  <span>Launch AI Assistant</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
                <button
                  className="btn-footer-secondary"
                  onClick={() => handleNavAnchor('#ai-tools')}
                >
                  <i className="bi bi-grid"></i>
                  <span>Explore Tools</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="row g-4 mb-4">
          {/* Left Brand Col */}
          <div className="col-lg-4 col-md-12">
            <div className="footer-brand-box">
              <Link className="brand-logo mb-3" to="/">
                <div className="logo-badge">
                  <i className="bi bi-bank2"></i>
                </div>
                <span className="brand-title">
                  Judicial<span className="brand-highlight">GPT</span>
                </span>
              </Link>
              
              <div className="footer-status-pill mb-3">
                <span className="status-indicator-dot"></span>
                <span>Active Corpus: PLD • SCMR • CLC • MLD • PCRLJ</span>
              </div>

              <p className="footer-brand-desc">
                Pakistan's premier AI judicial intelligence platform, empowering advocates, judges, and legal researchers with verified citations, vernacular NLP, and rapid precedent discovery.
              </p>

              {/* Quick Platform Chips */}
              <div className="footer-chip-group">
                <span className="footer-micro-chip">
                  <i className="bi bi-award-fill text-success"></i> SCMR Grounded
                </span>
                <span className="footer-micro-chip">
                  <i className="bi bi-translate text-success"></i> 5 Vernacular Dialects
                </span>
                <span className="footer-micro-chip">
                  <i className="bi bi-shield-lock-fill text-success"></i> 256-Bit TLS
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Category Cards */}
          <div className="col-lg-8 col-md-12">
            <div className="row g-3">
              {/* Category 1: Jurisdictions */}
              <div className="col-12 col-sm-4">
                <div className="footer-nav-card">
                  <div className="footer-card-header">
                    <div className="footer-card-icon-wrap">
                      <i className="bi bi-bank"></i>
                    </div>
                    <h5 className="footer-heading mb-0">Platform</h5>
                  </div>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#features" onClick={(e) => { e.preventDefault(); handleNavAnchor('#features') }}>
                        <i className="bi bi-building"></i>
                        <span>Supreme Court (SCMR)</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#features" onClick={(e) => { e.preventDefault(); handleNavAnchor('#features') }}>
                        <i className="bi bi-file-earmark-ruled"></i>
                        <span>High Courts (PLD/CLC)</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#features" onClick={(e) => { e.preventDefault(); handleNavAnchor('#features') }}>
                        <i className="bi bi-journal-bookmark"></i>
                        <span>Federal Statutes & Acts</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#features" onClick={(e) => { e.preventDefault(); handleNavAnchor('#features') }}>
                        <i className="bi bi-translate"></i>
                        <span>Multilingual Legal NLP</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 2: Resources & AI */}
              <div className="col-12 col-sm-4">
                <div className="footer-nav-card">
                  <div className="footer-card-header">
                    <div className="footer-card-icon-wrap">
                      <i className="bi bi-cpu"></i>
                    </div>
                    <h5 className="footer-heading mb-0">Resources</h5>
                  </div>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#ai-tools" onClick={(e) => { e.preventDefault(); handleNavAnchor('#ai-tools') }}>
                        <i className="bi bi-robot"></i>
                        <span>AI Research Suite</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavAnchor('#how-it-works') }}>
                        <i className="bi bi-diagram-3"></i>
                        <span>Citation Pipeline</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); handleNavAnchor('#about') }}>
                        <i className="bi bi-shield-check"></i>
                        <span>Security & Privacy</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); handleNavAnchor('#about') }}>
                        <i className="bi bi-file-text"></i>
                        <span>Legal Documentation</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 3: Bar & Org */}
              <div className="col-12 col-sm-4">
                <div className="footer-nav-card">
                  <div className="footer-card-header">
                    <div className="footer-card-icon-wrap">
                      <i className="bi bi-people"></i>
                    </div>
                    <h5 className="footer-heading mb-0">Bar & Council</h5>
                  </div>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#team" onClick={(e) => { e.preventDefault(); handleNavAnchor('#team') }}>
                        <i className="bi bi-mortarboard"></i>
                        <span>Research Team</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); handleNavAnchor('#about') }}>
                        <i className="bi bi-patch-check"></i>
                        <span>Pakistan Bar Assns</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); handleNavAnchor('#about') }}>
                        <i className="bi bi-shield-shaded"></i>
                        <span>Ethical AI Guidelines</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); handleNavAnchor('#about') }}>
                        <i className="bi bi-chat-left-dots"></i>
                        <span>Contact Counsel</span>
                        <i className="bi bi-chevron-right link-chevron"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Middle Divider */}
        <div className="footer-divider-line"></div>

        {/* Bottom Bar: Copyright, Badges & Back to Top */}
        <div className="footer-bottom-row">
          <div className="footer-copyright-wrap">
            <p className="mb-0 footer-copy-text">
              &copy; {new Date().getFullYear()} <strong>JudicialGPT Intelligence Platform</strong>. National Centre of AI & Law. All rights reserved.
            </p>
          </div>

          <div className="footer-badges-container">
            <span className="footer-badge-pill footer-badge-security">
              <span className="footer-badge-icon">🛡️</span>
              <span className="footer-badge-label">256-Bit TLS Bank-Grade Encryption</span>
            </span>
            <span className="footer-badge-pill footer-badge-jurisprudence">
              <span className="footer-badge-icon">🇵🇰</span>
              <span className="footer-badge-label">Pakistani Common Law Jurisprudence</span>
            </span>
            <button
              className="footer-back-to-top"
              onClick={scrollToTop}
              title="Back to top"
              aria-label="Back to top"
            >
              <i className="bi bi-arrow-up-short"></i>
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

