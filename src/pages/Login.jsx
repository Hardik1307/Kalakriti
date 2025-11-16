import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check against stored user accounts
      const existingUsers = JSON.parse(localStorage.getItem('kalakriti_users') || '[]')
      
      // Check for admin account first
      if (formData.email === 'admin@kalakriti.com' && formData.password === 'admin123') {
        const userData = {
          id: 'admin',
          email: formData.email,
          name: 'Admin User',
          firstName: 'Admin',
          lastName: 'User',
          userType: 'admin',
          loginTime: new Date().toISOString(),
          createdAt: new Date().toISOString()
        }
        
        localStorage.setItem('kalakriti_currentUser', JSON.stringify(userData))
        
        alert('Login successful! Welcome back, Admin.')
        navigate('/')
        return
      }
      
      // Check against registered users
      const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password)
      
      if (user) {
        // Store user session
        const userData = {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType,
          loginTime: new Date().toISOString(),
          createdAt: user.createdAt
        }
        
        localStorage.setItem('kalakriti_currentUser', JSON.stringify(userData))
        
        alert(`Login successful! Welcome back, ${user.firstName}!`)
        navigate('/')
      } else {
        // Check if email exists but password is wrong
        const emailExists = existingUsers.find(u => u.email === formData.email)
        if (emailExists) {
          setErrors({
            password: 'Incorrect password'
          })
        } else {
          setErrors({
            email: 'No account found with this email address'
          })
        }
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center fixed',
      backgroundSize: 'cover',
      position: 'relative'
    }}>
      <div className="login" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center/cover',
        padding: '50px 0',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div className="login-container" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '50px',
          borderRadius: '25px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideInUp 0.8s ease-out'
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
            fontSize: '2.5rem',
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative'
          }}>
            Welcome Back
          </h2>
          
          {errors.general && (
            <div className="error-message" style={{
              background: '#fee',
              color: '#c53030',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #feb2b2',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  border: `2px solid ${errors.email ? '#f56565' : '#e1e5e9'}`,
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#333',
                  boxShadow: errors.email ? '0 0 0 4px rgba(245, 101, 101, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#6a11cb'
                    e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#e1e5e9'
                    e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              />
              {errors.email && (
                <div className="error-message" style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  border: `2px solid ${errors.password ? '#f56565' : '#e1e5e9'}`,
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#333',
                  boxShadow: errors.password ? '0 0 0 4px rgba(245, 101, 101, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#6a11cb'
                    e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#e1e5e9'
                    e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              />
              {errors.password && (
                <div className="error-message" style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.password}
                </div>
              )}
            </div>

            <div className="remember-forgot" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <label className="remember-label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem',
                color: '#666'
              }}>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#6a11cb'
                  }}
                />
                Remember me
              </label>
              <a href="#" className="forgot-password" style={{
                color: '#6a11cb',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}>
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="login-button"
              style={{
                width: '100%',
                padding: '18px',
                background: isLoading ? '#ccc' : 'linear-gradient(45deg, #6a11cb, #2575fc)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(106, 17, 203, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'inherit',
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'linear-gradient(45deg, #2575fc, #6a11cb)'
                  e.target.style.transform = 'translateY(-3px) scale(1.02)'
                  e.target.style.boxShadow = '0 12px 35px rgba(106, 17, 203, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'linear-gradient(45deg, #6a11cb, #2575fc)'
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = '0 8px 25px rgba(106, 17, 203, 0.3)'
                }
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div style={{
            background: '#e6f3ff',
            border: '1px solid #b3d9ff',
            borderRadius: '10px',
            padding: '15px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#0066cc', marginBottom: '8px', fontSize: '14px' }}>
              🔑 Demo Credentials
            </h4>
            <p style={{ fontSize: '13px', color: '#0066cc', margin: 0 }}>
              <strong>Email:</strong> admin@kalakriti.com<br />
              <strong>Password:</strong> admin123
            </p>
          </div>

          <div className="signup-link" style={{
            textAlign: 'center',
            marginTop: '25px',
            paddingTop: '25px',
            borderTop: '2px solid rgba(106, 17, 203, 0.1)'
          }}>
            <p>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                style={{
                  color: '#6a11cb',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                Sign up here
              </Link>
            </p>
            
            {/* Debug info for testing */}
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              fontSize: '12px',
              color: '#666',
              textAlign: 'left'
            }}>
              <strong>Test Accounts:</strong><br />
              Admin: admin@kalakriti.com / admin123<br />
              {(() => {
                const users = JSON.parse(localStorage.getItem('kalakriti_users') || '[]')
                return users.length > 0 
                  ? `Registered: ${users[users.length - 1]?.email} / [your signup password]`
                  : 'No registered users yet - Sign up first!'
              })()}
              <br />
              <button
                onClick={() => {
                  localStorage.removeItem('kalakriti_users')
                  alert('All user accounts cleared!')
                  window.location.reload()
                }}
                style={{
                  marginTop: '10px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear All Accounts (Testing)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login