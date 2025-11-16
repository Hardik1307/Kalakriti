import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2c3e50, #34495e)',
      color: 'white',
      padding: '60px 0 20px',
      marginTop: '80px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontSize: '2rem',
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Kalakriti
            </h3>
            <p style={{ 
              lineHeight: '1.6', 
              marginBottom: '20px',
              color: '#bdc3c7'
            }}>
              India's premier platform for authentic traditional art. Connecting art lovers 
              with talented artists and preserving cultural heritage through digital innovation.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                fontSize: '18px',
                transition: 'transform 0.3s ease'
              }}>
                📘
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                fontSize: '18px',
                transition: 'transform 0.3s ease'
              }}>
                📷
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                fontSize: '18px',
                transition: 'transform 0.3s ease'
              }}>
                🐦
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '20px',
              color: '#ecf0f1'
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { to: '/gallery', label: 'Art Gallery' },
                { to: '/artists', label: 'Featured Artists' },
                { to: '/auctions', label: 'Live Auctions' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link 
                    to={link.to}
                    style={{
                      color: '#bdc3c7',
                      textDecoration: 'none',
                      fontSize: '15px',
                      transition: 'color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#6a11cb'}
                    onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                  >
                    <span style={{ fontSize: '12px' }}>▶</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Art Categories */}
          <div>
            <h4 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '20px',
              color: '#ecf0f1'
            }}>
              Art Forms
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Madhubani Paintings',
                'Rajput Miniatures',
                'Kalamkari Art',
                'Warli Paintings',
                'Gond Art',
                'Pattachitra'
              ].map((art, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <span style={{
                    color: '#bdc3c7',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '12px', color: '#6a11cb' }}>🎨</span>
                    {art}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '20px',
              color: '#ecf0f1'
            }}>
              Get in Touch
            </h4>
            <div style={{ marginBottom: '15px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
                color: '#bdc3c7'
              }}>
                <span style={{ fontSize: '16px' }}>📧</span>
                <span>info@kalakriti.com</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
                color: '#bdc3c7'
              }}>
                <span style={{ fontSize: '16px' }}>📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '15px',
                color: '#bdc3c7'
              }}>
                <span style={{ fontSize: '16px' }}>📍</span>
                <span>New Delhi, India</span>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(106, 17, 203, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(106, 17, 203, 0.2)'
            }}>
              <h5 style={{ 
                marginBottom: '10px', 
                color: '#6a11cb',
                fontSize: '14px'
              }}>
                Newsletter
              </h5>
              <p style={{ 
                fontSize: '13px', 
                marginBottom: '10px',
                color: '#bdc3c7'
              }}>
                Get updates on new artworks and exhibitions
              </p>
              <div style={{ display: 'flex', gap: '5px' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '13px'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ color: '#bdc3c7', fontSize: '14px' }}>
            © {currentYear} Kalakriti. All rights reserved. | Preserving Indian Art Heritage
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{
              color: '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}>
              Privacy Policy
            </a>
            <a href="#" style={{
              color: '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}>
              Terms of Service
            </a>
            <a href="#" style={{
              color: '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer