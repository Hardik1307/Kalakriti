import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'white',
        padding: '60px 40px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🎨</div>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '15px',
          background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
          style={{
            padding: '15px 30px',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          🏠 Go Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
