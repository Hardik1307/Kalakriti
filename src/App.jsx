import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import './App.css'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Artists = lazy(() => import('./pages/Artists'))
const Auctions = lazy(() => import('./pages/Auctions'))
const AuctionRoom = lazy(() => import('./pages/AuctionRoom'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Cart = lazy(() => import('./pages/Cart'))
const Payment = lazy(() => import('./pages/Payment'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const ArtworkDetail = lazy(() => import('./pages/ArtworkDetail'))
const ArtistProfile = lazy(() => import('./pages/ArtistProfile'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const AddPainting = lazy(() => import('./pages/AddPainting'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Kalakriti Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
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
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎨</div>
            <h1 style={{ 
              fontSize: '2rem', 
              marginBottom: '15px',
              background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              We're sorry, but something unexpected happened. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
  }}>
    <div style={{
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #6a11cb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h3 style={{ 
        color: '#6a11cb',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        Loading Kalakriti...
      </h3>
      <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '10px' }}>
        Preparing your art experience
      </p>
    </div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/auctions" element={<Auctions />} />
                  <Route path="/auction-room/:id" element={<AuctionRoom />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/artwork/:id" element={<ArtworkDetail />} />
                  <Route path="/artist/:id" element={<ArtistProfile />} />
                  <Route path="/add-painting" element={<AddPainting />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  )
}

export default App
