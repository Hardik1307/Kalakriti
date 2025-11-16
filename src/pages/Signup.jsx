import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    agreeTerms: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    // Before @ only numbers, underscore, and alphabets
    // After @ should be alphabets
    // Must end with .com
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z]+\.com$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  }

  const getPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }

    const passedChecks = Object.values(checks).filter(Boolean).length
    return { checks, strength: passedChecks }
  }

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,30}$/
    return nameRegex.test(name)
  }

  const validateForm = () => {
    const newErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name must be 2-30 characters and contain only letters'
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name must be 2-30 characters and contain only letters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must contain only letters, numbers, underscore before @, letters after @, and end with .com'
    }

    // User type validation
    if (!formData.userType) {
      newErrors.userType = 'Please select a user type'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      const { checks } = getPasswordStrength(formData.password)
      const missing = []
      if (!checks.length) missing.push('at least 8 characters')
      if (!checks.uppercase) missing.push('uppercase letter')
      if (!checks.lowercase) missing.push('lowercase letter')
      if (!checks.number) missing.push('number')
      if (!checks.special) missing.push('special character')
      newErrors.password = `Password must contain: ${missing.join(', ')}`
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData({
      ...formData,
      [name]: newValue
    })

    // Real-time validation
    const newErrors = { ...errors }

    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        newErrors.email = 'Email must contain only letters, numbers, underscore before @, letters after @, and end with .com'
      } else {
        newErrors.email = ''
      }
    }

    if (name === 'password' && value) {
      if (!validatePassword(value)) {
        const { checks } = getPasswordStrength(value)
        const missing = []
        if (!checks.length) missing.push('at least 8 characters')
        if (!checks.uppercase) missing.push('uppercase letter')
        if (!checks.lowercase) missing.push('lowercase letter')
        if (!checks.number) missing.push('number')
        if (!checks.special) missing.push('special character')
        newErrors.password = `Password must contain: ${missing.join(', ')}`
      } else {
        newErrors.password = ''
      }
    }

    if (name === 'confirmPassword' && value) {
      if (value !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match'
      } else {
        newErrors.confirmPassword = ''
      }
    }

    // Clear other errors when user starts typing
    if (name !== 'email' && name !== 'password' && name !== 'confirmPassword' && errors[name]) {
      newErrors[name] = ''
    }

    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Store user account in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('kalakriti_users') || '[]')

      // Check if user already exists
      const userExists = existingUsers.find(user => user.email === formData.email)
      if (userExists) {
        setErrors({
          email: 'An account with this email already exists'
        })
        return
      }

      // Create new user account
      const newUser = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // In real app, this would be hashed
        userType: formData.userType,
        createdAt: new Date().toISOString()
      }

      // Add to users array and save
      existingUsers.push(newUser)
      localStorage.setItem('kalakriti_users', JSON.stringify(existingUsers))

      // Mock successful registration
      alert(`Account created successfully! You can now login with ${formData.email}`)
      navigate('/login')
    } catch (error) {
      setErrors({
        general: 'Registration failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center fixed',
      backgroundSize: 'cover',
      position: 'relative'
    }}>
      <div className="signup" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center/cover',
        padding: '50px 0',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div className="login-container signup-container" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '500px',
          margin: '100px auto',
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
            Join Kalakriti
          </h2>

          {errors.general && (
            <div style={{
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1.1rem'
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6a11cb'
                    e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9'
                    e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                />
                {errors.firstName && (
                  <div style={{
                    color: '#f56565',
                    fontSize: '0.75rem',
                    marginTop: '5px',
                    fontWeight: '500'
                  }}>
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1.1rem'
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6a11cb'
                    e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9'
                    e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                />
                {errors.lastName && (
                  <div style={{
                    color: '#f56565',
                    fontSize: '0.75rem',
                    marginTop: '5px',
                    fontWeight: '500'
                  }}>
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example123@domain.com"
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9'
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                  e.target.style.transform = 'translateY(0)'
                }}
              />

              {errors.email && (
                <div style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.email}
                </div>
              )}

              {!formData.email && (
                <div style={{
                  color: '#666',
                  fontSize: '0.75rem',
                  marginTop: '5px',
                  fontStyle: 'italic'
                }}>
                  Format: letters/numbers/underscore@letters.com
                </div>
              )}

              {formData.email && !errors.email && validateEmail(formData.email) && (
                <div style={{
                  color: '#2ed573',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  ✓ Valid email format
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem'
              }}>
                User Type
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9'
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <option value="">Select User Type</option>
                <option value="buyer">Art Buyer</option>
                <option value="artist">Artist</option>
                <option value="collector">Collector</option>
              </select>

              {errors.userType && (
                <div style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.userType}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 8 chars, A-Z, a-z, 0-9, special char"
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9'
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                  e.target.style.transform = 'translateY(0)'
                }}
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Password Strength:
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                    {[1, 2, 3, 4, 5].map((level) => {
                      const { strength } = getPasswordStrength(formData.password)
                      return (
                        <div
                          key={level}
                          style={{
                            flex: 1,
                            height: '4px',
                            borderRadius: '2px',
                            background: strength >= level
                              ? strength <= 2 ? '#ff4757'
                                : strength <= 3 ? '#ffa502'
                                  : strength <= 4 ? '#2ed573'
                                    : '#5f27cd'
                              : '#e1e5e9'
                          }}
                        />
                      )
                    })}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {(() => {
                      const { checks } = getPasswordStrength(formData.password)
                      const requirements = [
                        { check: checks.length, text: '8+ characters' },
                        { check: checks.uppercase, text: 'Uppercase' },
                        { check: checks.lowercase, text: 'Lowercase' },
                        { check: checks.number, text: 'Number' },
                        { check: checks.special, text: 'Special char' }
                      ]
                      return requirements.map((req, index) => (
                        <span
                          key={index}
                          style={{
                            color: req.check ? '#2ed573' : '#ff4757',
                            marginRight: '12px',
                            fontSize: '11px'
                          }}
                        >
                          {req.check ? '✓' : '✗'} {req.text}
                        </span>
                      ))
                    })()}
                  </div>
                </div>
              )}

              {errors.password && (
                <div style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9'
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                  e.target.style.transform = 'translateY(0)'
                }}
              />

              {errors.confirmPassword && (
                <div style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.confirmPassword}
                </div>
              )}

              {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                <div style={{
                  color: '#2ed573',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  ✓ Passwords match
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label className="remember-label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '10px',
                borderRadius: '10px',
                background: 'rgba(106, 17, 203, 0.05)'
              }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#6a11cb',
                    cursor: 'pointer'
                  }}
                />
                I agree to the{' '}
                <a href="#" style={{
                  color: '#6a11cb',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}>
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" style={{
                  color: '#6a11cb',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}>
                  Privacy Policy
                </a>
              </label>

              {errors.agreeTerms && (
                <div style={{
                  color: '#f56565',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {errors.agreeTerms}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '18px',
                background: isLoading
                  ? 'linear-gradient(45deg, #9ca3af, #6b7280)'
                  : 'linear-gradient(45deg, #6a11cb, #2575fc)',
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
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #ffffff40',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="signup-link" style={{
            textAlign: 'center',
            marginTop: '35px',
            paddingTop: '25px',
            borderTop: '2px solid rgba(106, 17, 203, 0.1)'
          }}>
            <p>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#6a11cb',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup