import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Destination after login (default to /assistant)
  const from = location.state?.from?.pathname || '/assistant'

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.')
      return
    }

    try {
      setIsLoading(true)
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setErrorMessage('')
    try {
      setIsGoogleLoading(true)
      await loginWithGoogle()
      navigate(from, { replace: true })
    } catch (err) {
      setErrorMessage(err.message || 'Google authentication could not be completed. Please try again.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container-card">
        {/* Left Side: Brand Showcase Panel */}
        <div className="auth-hero-panel">
          <div className="auth-hero-content">
            <div className="auth-hero-badge">
              <i className="bi bi-shield-lock-fill"></i>
              <span>Pakistani Jurisprudence AI</span>
            </div>

            <h1 className="auth-hero-title">
              Sign in to your <span>Legal Intelligence</span> Workspace.
            </h1>

            <p className="auth-hero-desc">
              Instant access to 2.4M+ Supreme Court and High Court reported judgments, multi-lingual drafting, and verified case precedence.
            </p>

            <div className="auth-highlights">
              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-database-check"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>SCMR, PLD & CLC Precedents</strong>
                  <span>Direct citation links with automatic overruling detection</span>
                </div>
              </div>

              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-translate"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Vernacular Legal NLP</strong>
                  <span>Bilingual synthesis in English, Urdu, Sindhi, Punjabi & Balochi</span>
                </div>
              </div>

              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-patch-check-fill"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Bar Association Standard</strong>
                  <span>End-to-end encrypted chamber privacy and confidentiality</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <span>Supreme Court of Pakistan & High Courts</span>
            <span>v2.4 Production</span>
          </div>
        </div>

        {/* Right Side: Login Form Area */}
        <div className="auth-form-panel">
          <div className="auth-header-top">
            <Link to="/" className="brand-logo">
              <div className="logo-badge" style={{ width: '34px', height: '34px' }}>
                <i className="bi bi-bank2 fs-6"></i>
              </div>
              <span className="brand-title" style={{ fontSize: '1.25rem' }}>
                Judicial<span className="brand-highlight">GPT</span>
              </span>
            </Link>

            <Link to="/" className="btn-back-home">
              <i className="bi bi-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>

          <h2 className="auth-form-title">Welcome back</h2>
          <p className="auth-form-subtitle">
            Please enter your chamber credentials to access your workspace.
          </p>

          {/* Continue with Google Button */}
          <button
            type="button"
            className="btn-google-auth"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <span className="spinner-border spinner-border-sm text-success" role="status"></span>
            ) : (
              <svg className="google-icon-svg" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 rounded-3 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.86rem' }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit}>
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="login-email">Email Address</label>
              <div className="input-with-icon">
                <input
                  id="login-email"
                  type="email"
                  className="auth-input-field"
                  placeholder="advocate@chamber.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                <i className="bi bi-envelope input-icon-leading"></i>
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <div className="input-with-icon">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input-field"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <i className="bi bi-lock input-icon-leading"></i>
                <button
                  type="button"
                  className="input-btn-trailing"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me for 30 days</span>
              </label>

              <a
                href="#forgot-password"
                className="auth-link"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Password reset instructions have been dispatched to your chamber registered email.')
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-auth-submit"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="auth-switch-prompt">
            Don't have an account?{' '}
            <Link to="/signup">Sign up for free</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
