import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const Header = () => {
  const location = useLocation()
  const { getCartCount } = useCart()
  const [user, setUser] = useState(null)

  const isActive = (path) => location.pathname === path

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
          <Link to="/">
            <h1>Kalakriti</h1>
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/gallery" className={isActive('/gallery') ? 'active' : ''}>Gallery</Link></li>
            <li><Link to="/artists" className={isActive('/artists') ? 'active' : ''}>Artists</Link></li>
            <li><Link to="/auctions" className={isActive('/auctions') ? 'active' : ''}>Auctions</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/cart" className="btn btn-outline">
            Cart ({getCartCount()})
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link 
                to="/profile" 
                className="btn btn-outline"
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
                onClick={handleLogout}
                className="btn btn-outline"
                style={{ fontSize: '14px', padding: '8px 16px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header