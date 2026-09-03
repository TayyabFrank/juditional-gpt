import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.')
      return
    }

    try {
      setIsLoading(true)
      await resetPassword(email.trim())
      setIsSuccess(true)
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send password reset email. Please verify your address.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container-card" style={{ maxWidth: '960px' }}>
        {/* Left Side: Brand Showcase Panel */}
        <div className="auth-hero-panel">
          <div className="auth-hero-content">
            <div className="auth-hero-badge">
              <i className="bi bi-shield-lock-fill"></i>
              <span>Account Recovery</span>
            </div>

            <h1 className="auth-hero-title">
              Reset your <span>Chamber Password</span> securely.
            </h1>

            <p className="auth-hero-desc">
              Enter your registered advocate email address to receive an official password reset link from JudicialGPT.
            </p>

            <div className="auth-highlights">
              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-envelope-check-fill"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Instant Reset Link</strong>
                  <span>Sent directly to your inbox via secure Firebase Auth service</span>
                </div>
              </div>

              <div className="auth-highlight-item">
                <div className="auth-highlight-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div className="auth-highlight-text">
                  <strong>Protected Chamber Data</strong>
                  <span>Your case briefs, research history, and saved drafts remain intact</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <div className="auth-trust-badge">
              <i className="bi bi-award-fill text-warning"></i>
              <span>National Center of Artificial Intelligence (NCAI)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Reset Form Area */}
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

            <Link to="/login" className="btn-back-home">
              <i className="bi bi-arrow-left"></i>
              <span>Back to Login</span>
            </Link>
          </div>

          <h2 className="auth-form-title">Forgot Password?</h2>
          <p className="auth-form-subtitle">
            No worries! Enter the email associated with your account and we'll send you recovery instructions.
          </p>

          {isSuccess ? (
            <div className="py-4 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981'
                }}
              >
                <i className="bi bi-check-circle-fill fs-2"></i>
              </div>

              <h4 className="fw-bold mb-2" style={{ color: '#064e3b' }}>
                Check Your Inbox & Spam
              </h4>
              <p className="text-muted mb-3" style={{ fontSize: '0.94rem', lineHeight: 1.6 }}>
                If an account exists with password authentication, reset instructions have been sent to:
                <br />
                <strong className="text-dark">{email}</strong>
              </p>

              <div
                className="alert alert-info py-2 px-3 rounded-3 mb-4 text-start"
                style={{
                  fontSize: '0.84rem',
                  backgroundColor: 'rgba(6, 78, 59, 0.08)',
                  borderColor: 'rgba(16, 185, 129, 0.3)',
                  color: '#064e3b'
                }}
              >
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-info-circle-fill text-success mt-1 flex-shrink-0"></i>
                  <div>
                    <strong>Didn't see the email?</strong>
                    <ul className="mb-0 ps-3 mt-1" style={{ fontSize: '0.82rem' }}>
                      <li>Check your <strong>Spam / Junk</strong> or <strong>Promotions</strong> folder.</li>
                      <li>Look for emails from <code>noreply@judicialgpt.firebaseapp.com</code>.</li>
                      <li>If you signed up with <strong>Google</strong>, please use <strong>"Continue with Google"</strong> to sign in.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <Link to="/login" className="btn-auth-submit text-decoration-none">
                  <span>Return to Sign In</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted mt-2"
                  onClick={() => setIsSuccess(false)}
                >
                  Did not receive the email? Try again
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div
                  className="alert alert-danger py-2 px-3 rounded-3 mb-3 d-flex flex-column gap-2"
                  style={{ fontSize: '0.86rem' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                    <span>{errorMessage}</span>
                  </div>
                  {errorMessage.toLowerCase().includes('sign up') && (
                    <div className="mt-1 pt-1 border-top border-danger border-opacity-25 d-flex align-items-center justify-content-between">
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>Need an account?</span>
                      <Link
                        to="/signup"
                        className="btn btn-sm btn-danger py-1 px-2 rounded-2 fw-semibold text-decoration-none"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Register First <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <div className="auth-form-group mb-4">
                <label className="auth-label" htmlFor="reset-email">
                  Registered Email Address
                </label>
                <div className="input-with-icon">
                  <input
                    id="reset-email"
                    type="email"
                    className="auth-input-field"
                    placeholder="e.g. advocate@chamber.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <i className="bi bi-envelope input-icon-leading"></i>
                </div>
              </div>

              <button
                type="submit"
                className="btn-auth-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <i className="bi bi-send-fill"></i>
                  </>
                )}
              </button>

              <div className="auth-switch-prompt mt-4 text-center">
                Remember your password?{' '}
                <Link to="/login">Sign in here</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
