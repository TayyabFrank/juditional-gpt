import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row g-4">
          {/* Left Brand Col */}
          <div className="col-lg-4">
            <Link className="brand-logo mb-3" to="/">
              <div className="logo-badge">
                <i className="bi bi-bank2"></i>
              </div>
              <span className="brand-title">
                Judicial<span className="brand-highlight">GPT</span>
              </span>
            </Link>
            <p className="text-muted pe-lg-4 mt-3" style={{ fontSize: '0.94rem', lineHeight: '1.6' }}>
              Pakistan's premier AI judicial intelligence platform, empowering advocates, judges, and researchers with verified citations, vernacular NLP, and rapid precedent discovery.
            </p>
          </div>

          {/* Col 1 */}
          <div className="col-6 col-lg-2 offset-lg-2">
            <h5 className="footer-heading">Platform</h5>
            <ul className="footer-link-list">
              <li><Link to="/features">Supreme Court (SCMR)</Link></li>
              <li><Link to="/features">High Courts (PLD/CLC)</Link></li>
              <li><Link to="/features">Federal Statutes</Link></li>
              <li><Link to="/features">Multilingual NLP</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="col-6 col-lg-2">
            <h5 className="footer-heading">Resources</h5>
            <ul className="footer-link-list">
              <li><Link to="/ai-tools">AI Research Suite</Link></li>
              <li><Link to="/how-it-works">Citation Pipeline</Link></li>
              <li><Link to="/about">Security & Privacy</Link></li>
              <li><Link to="/about">Documentation</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="col-6 col-lg-2">
            <h5 className="footer-heading">Bar & Organization</h5>
            <ul className="footer-link-list">
              <li><Link to="/team">Research Team</Link></li>
              <li><Link to="/about">Pakistan Bar Assns</Link></li>
              <li><Link to="/about">Ethical AI Guidelines</Link></li>
              <li><Link to="/about">Contact Counsel</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider-line"></div>

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
          <p className="mb-0 text-muted footer-copy-text" style={{ fontSize: '0.86rem' }}>
            &copy; {new Date().getFullYear()} JudicialGPT Intelligence Platform. All rights reserved.
          </p>
          <div className="footer-badges-container d-flex flex-wrap align-items-center justify-content-center justify-content-md-end gap-2">
            <span className="footer-badge-pill footer-badge-security">
              <span className="footer-badge-icon">🛡️</span>
              <span className="footer-badge-label">256-Bit TLS Bank-Grade Encryption</span>
            </span>
            <span className="footer-badge-pill footer-badge-jurisprudence">
              <span className="footer-badge-icon">🇵🇰</span>
              <span className="footer-badge-label">Pakistani Common Law Jurisprudence</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
