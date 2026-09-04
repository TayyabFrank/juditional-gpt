import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  registerUser,
  loginUser,
  signInWithGoogle,
  logoutUser,
  resetPassword,
  subscribeToAuthChanges,
  getFriendlyAuthErrorMessage,
  isFirebaseConfigured
} from '../firebase'

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

  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [authNotification, setAuthNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setAuthNotification({ message, type })
    setTimeout(() => {
      setAuthNotification(null)
    }, 4000)
  }

  // Real-time listener for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((userProfile) => {
      if (userProfile) {
        setCurrentUser(userProfile)
        localStorage.setItem('judicialgpt_user', JSON.stringify(userProfile))
      } else if (isFirebaseConfigured) {
        // If Firebase is active and user signed out
        setCurrentUser(null)
        localStorage.removeItem('judicialgpt_user')
      }
      setIsLoadingAuth(false)
    })

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle()
      setCurrentUser(user)
      localStorage.setItem('judicialgpt_user', JSON.stringify(user))
      showNotification('Welcome back! Signed in with Google successfully.', 'success')
      return user
    } catch (err) {
      const friendlyMsg = getFriendlyAuthErrorMessage(err)
      showNotification(friendlyMsg, 'danger')
      throw new Error(friendlyMsg)
    }
  }

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        showNotification('Please fill in both email and password.', 'danger')
        throw new Error('Please fill in both email and password.')
      }
      const user = await loginUser(email, password)
      setCurrentUser(user)
      localStorage.setItem('judicialgpt_user', JSON.stringify(user))
      showNotification(`Welcome back, ${user.name || 'Advocate'}!`, 'success')
      return user
    } catch (err) {
      const friendlyMsg = getFriendlyAuthErrorMessage(err)
      showNotification(friendlyMsg, 'danger')
      throw new Error(friendlyMsg)
    }
  }

  const signup = async ({ firstName, lastName, name, email, mobile, password, role }) => {
    try {
      if (!email || !password) {
        showNotification('Please complete all required fields.', 'danger')
        throw new Error('Missing fields')
      }
      const fName = firstName || (name ? name.split(' ')[0] : 'Advocate')
      const lName = lastName || (name ? name.split(' ').slice(1).join(' ') : 'User')

      const newUser = await registerUser({
        email,
        password,
        firstName: fName,
        lastName: lName,
        mobile,
        role: role || 'Legal Professional'
      })
      setCurrentUser(newUser)
      localStorage.setItem('judicialgpt_user', JSON.stringify(newUser))
      showNotification(`Welcome to JudicialGPT, ${newUser.name}!`, 'success')
      return newUser
    } catch (err) {
      const friendlyMsg = getFriendlyAuthErrorMessage(err)
      showNotification(friendlyMsg, 'danger')
      throw new Error(friendlyMsg)
    }
  }

  const handleResetPassword = async (email) => {
    try {
      if (!email) throw new Error('Please provide your email address.')
      await resetPassword(email)
      showNotification('Password reset instructions sent to your email.', 'success')
      return true
    } catch (err) {
      const friendlyMsg = getFriendlyAuthErrorMessage(err)
      showNotification(friendlyMsg, 'danger')
      throw new Error(friendlyMsg)
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.warn('[JudicialGPT Auth] Logout error:', err)
    } finally {
      setCurrentUser(null)
      localStorage.removeItem('judicialgpt_user')
      showNotification('You have been signed out.', 'info')
    }
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoadingAuth,
    isFirebaseConfigured,
    loginWithGoogle,
    login,
    signup,
    resetPassword: handleResetPassword,
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

// eslint-disable-next-line react-refresh/only-export-components, react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

