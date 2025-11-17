import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const Header = () => {
  const location = useLocation()
  const { getCartCount } = useCart()
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    // Check for user session
    const checkUserSession = () => {
      const currentUser = localStorage.getItem('kalakriti_currentUser')
      if (currentUser) {
        try {
          const userData = JSON.parse(currentUser)
          setUser(userData)
        } catch (error) {
          console.error('Error parsing session data:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    checkUserSession()
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkUserSession)
    
    return () => {
      window.removeEventListener('storage', checkUserSession)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('kalakriti_currentUser')
    setUser(null)
    alert('Logged out successfully!')
  }

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={closeMobileMenu}>
            <h1>Kalakriti</h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={mobileMenuOpen ? 'mobile-menu-open' : ''}>
          <ul>
            <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/gallery" className={isActive('/gallery') ? 'active' : ''} onClick={closeMobileMenu}>Gallery</Link></li>
            <li><Link to="/artists" className={isActive('/artists') ? 'active' : ''} onClick={closeMobileMenu}>Artists</Link></li>
            <li><Link to="/auctions" className={isActive('/auctions') ? 'active' : ''} onClick={closeMobileMenu}>Auctions</Link></li>
            {user && user.userType === 'admin' && (
              <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''} onClick={closeMobileMenu}>Admin</Link></li>
            )}
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMobileMenu}>About</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMobileMenu}>Contact</Link></li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/cart" className="btn btn-outline" onClick={closeMobileMenu}>
            Cart ({getCartCount()})
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <Link 
                to="/profile" 
                className="btn btn-outline"
                onClick={closeMobileMenu}
                style={{ 
                  fontSize: '14px', 
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  textDecoration: 'none'
                }}
              >
                👤 {user.firstName || user.name}
              </Link>
              <button 
                onClick={() => {
                  handleLogout()
                  closeMobileMenu()
                }}
                className="btn btn-outline"
                style={{ fontSize: '14px', padding: '8px 16px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={closeMobileMenu}>Login</Link>
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileMenu}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header