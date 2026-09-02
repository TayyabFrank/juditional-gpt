import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('judicialgpt_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [authNotification, setAuthNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setAuthNotification({ message, type })
    setTimeout(() => {
      setAuthNotification(null)
    }, 4000)
  }

  const loginWithGoogle = async () => {
    // Simulated Google OAuth Flow
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = {
          name: 'Advocate Tayyab',
          email: 'tayyab.advocate@gmail.com',
          role: 'Advocate High Court',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          authProvider: 'google',
          joinedAt: new Date().toISOString()
        }
        setCurrentUser(googleUser)
        localStorage.setItem('judicialgpt_user', JSON.stringify(googleUser))
        showNotification('Welcome back! Signed in with Google successfully.', 'success')
        resolve(googleUser)
      }, 700)
    })
  }

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          showNotification('Please fill in both email and password.', 'danger')
          reject(new Error('Missing credentials'))
          return
        }
        const user = {
          name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Advocate User',
          email,
          role: 'Legal Professional',
          avatar: null,
          authProvider: 'email',
          joinedAt: new Date().toISOString()
        }
        setCurrentUser(user)
        localStorage.setItem('judicialgpt_user', JSON.stringify(user))
        showNotification(`Welcome back, ${user.name}!`, 'success')
        resolve(user)
      }, 600)
    })
  }

  const signup = async ({ name, email, mobile, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password || !name) {
          showNotification('Please complete all required fields.', 'danger')
          reject(new Error('Missing fields'))
          return
        }
        const newUser = {
          name: name.trim(),
          email: email.trim(),
          mobile: mobile ? mobile.trim() : '',
          role: 'Legal Professional',
          avatar: null,
          authProvider: 'email',
          joinedAt: new Date().toISOString()
        }
        setCurrentUser(newUser)
        localStorage.setItem('judicialgpt_user', JSON.stringify(newUser))
        showNotification(`Welcome to JudicialGPT, ${newUser.name}!`, 'success')
        resolve(newUser)
      }, 600)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('judicialgpt_user')
    showNotification('You have been signed out.', 'info')
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loginWithGoogle,
    login,
    signup,
    logout,
    authNotification,
    setAuthNotification
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      {authNotification && (
        <div 
          className={`position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-3`}
          style={{
            zIndex: 9999,
            backgroundColor: authNotification.type === 'danger' ? '#b91c1c' : '#047857',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeInUp 0.3s ease'
          }}
        >
          <i className={`bi ${authNotification.type === 'danger' ? 'bi-exclamation-octagon' : 'bi-check-circle-fill'} fs-5`}></i>
          <div>
            <div className="fw-semibold" style={{ fontSize: '0.92rem' }}>{authNotification.message}</div>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white ms-auto"
            onClick={() => setAuthNotification(null)}
          ></button>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
