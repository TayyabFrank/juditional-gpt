import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function Signup() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup, loginWithGoogle } = useAuth()

  // Only the required fields requested:
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Destination after signup (default to /assistant)
  const from = location.state?.from?.pathname || '/assistant'

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '#e2e8f0', width: '0%' }
    let score = 0
    if (pass.length >= 6) score += 1
    if (pass.length >= 10) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 2) return { score: 1, label: 'Weak', color: '#ef4444', width: '33%' }
    if (score <= 3) return { score: 2, label: 'Medium', color: '#f59e0b', width: '66%' }
    return { score: 3, label: 'Strong', color: '#10b981', width: '100%' }
  }

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!firstName.trim()) {
      setErrorMessage('Please enter your first name.')
      return
    }

    if (!lastName.trim()) {
      setErrorMessage('Please enter your last name.')
      return
    }

    if (!mobile.trim()) {
      setErrorMessage('Please enter your mobile number.')
      return
    }

    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.')
      return
    }

    try {
      setIsLoading(true)
      const fullName = `${firstName.trim()} ${lastName.trim()}`
      await signup({ name: fullName, email, mobile, password })
      navigate(from, { replace: true })
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
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
      <div className="auth-container-card" style={{ maxWidth: '1060px' }}>
        {/* Left Side: Brand Showcase Panel */}
        <div className="auth-hero-panel">
          <div className="auth-hero-content">
            <div className="auth-hero-badge">
              <i className="bi bi-stars"></i>
              <span>Free Advocate Tier</span>
            </div>

            <h1 className="auth-hero-title">
              Start your <span>Free Chamber Access</span> today.
            </h1>

            <p className="auth-hero-desc">
              Join 10,000+ advocates, judges, and researchers across Pakistan who cut case research time by 85%.
            </p>

            <div className="auth-highlights">
              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Instant Case Precedent Discovery</strong>
                  <span>Analyze complex facts against 2.4M+ Supreme Court & High Court judgments</span>
                </div>
              </div>

              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-file-earmark-diff-fill"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Vernacular Plaint & Contract Drafting</strong>
                  <span>Automated bilingual synthesis in English, Urdu, Sindhi, and Balochi</span>
                </div>
              </div>

              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Strict Advocate-Client Confidentiality</strong>
                  <span>Protected chamber workspaces and zero data leakage</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <span>National Center of AI (NCAI) Initiative</span>
            <span>Zero Lock-in</span>
          </div>
        </div>

        {/* Right Side: Signup Form Area */}
        <div className="auth-form-panel" style={{ padding: '2.8rem 2.6rem' }}>
          <div className="auth-header-top" style={{ marginBottom: '1.2rem' }}>
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

          <h2 className="auth-form-title">Create your account</h2>
          <p className="auth-form-subtitle" style={{ marginBottom: '1.4rem' }}>
            Get started with free access to Pakistani legal AI intelligence.
          </p>

          {/* Continue with Google Button */}
          <button
            type="button"
            className="btn-google-auth"
            onClick={handleGoogleSignUp}
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

          <div className="auth-divider" style={{ margin: '1.2rem 0' }}>
            <span>or sign up with email</span>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 rounded-3 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.86rem' }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form: only First Name, Last Name, Mobile No., Email, Password, Confirm Password */}
          <form onSubmit={handleSubmit}>
            {/* 1. First Name & Last Name */}
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="signup-firstname">First Name</label>
                  <div className="input-with-icon">
                    <input
                      id="signup-firstname"
                      type="text"
                      className="auth-input-field"
                      placeholder="e.g. Muhammad"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      required
                    />
                    <i className="bi bi-person input-icon-leading"></i>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="signup-lastname">Last Name</label>
                  <div className="input-with-icon">
                    <input
                      id="signup-lastname"
                      type="text"
                      className="auth-input-field"
                      placeholder="e.g. Tayyab"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      required
                    />
                    <i className="bi bi-person input-icon-leading"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Mobile No. & Email Address */}
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="signup-mobile">Mobile No.</label>
                  <div className="input-with-icon">
                    <input
                      id="signup-mobile"
                      type="tel"
                      className="auth-input-field"
                      placeholder="+92 300 1234567"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      autoComplete="tel"
                      required
                    />
                    <i className="bi bi-telephone input-icon-leading"></i>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="signup-email">Email Address</label>
                  <div className="input-with-icon">
                    <input
                      id="signup-email"
                      type="email"
                      className="auth-input-field"
                      placeholder="tayyab@chamber.pk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                    <i className="bi bi-envelope input-icon-leading"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Password & Confirm Password */}
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="signup-password">Password</label>
                  <div className="input-with-icon">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input-field"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
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

                  {password && (
                    <div className="password-strength-container">
                      <div className="strength-bar-track">
                        <div
                          className="strength-bar-fill"
                          style={{ width: strength.width, backgroundColor: strength.color }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted" style={{ fontSize: '0.72rem' }}>Strength</span>
                        <span className="strength-label-text" style={{ color: strength.color }}>
                          {strength.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="signup-confirm-password">Confirm Password</label>
                  <div className="input-with-icon">
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="auth-input-field"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <i className="bi bi-shield-lock input-icon-leading"></i>
                    <button
                      type="button"
                      className="input-btn-trailing"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <span className="text-danger mt-1 d-block" style={{ fontSize: '0.74rem' }}>
                      Passwords do not match
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-auth-submit mt-2"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="auth-switch-prompt" style={{ marginTop: '1.2rem' }}>
            Already have an account?{' '}
            <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
