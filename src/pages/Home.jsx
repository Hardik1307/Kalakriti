import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useNotification } from '../hooks/useNotification'
import Notification from '../components/Notification'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addToCart } = useCart()
  const { notification, showNotification, hideNotification } = useNotification()

  const slides = [
    {
      image: '/images/new%20images/painting%201.webp',
      title: 'Discover and Collect Indian Paintings',
      description: 'Support Indian artists and find unique paintings for your collection through our online gallery and real-time auctions.',
      buttons: [
        { text: 'Explore Gallery', link: '/gallery', type: 'primary' },
        { text: 'Join Auction', link: '/auctions', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%202.jpg',
      title: 'Bid Live. Win Originals.',
      description: 'Experience exciting live auctions and bring home one-of-a-kind paintings.',
      buttons: [
        { text: 'Live Auctions', link: '/auctions', type: 'primary' },
        { text: 'Browse Paintings', link: '/gallery', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%203.jpg',
      title: 'Support Indian Talent',
      description: 'Every purchase directly supports Indian painting artists and their cultural heritage.',
      buttons: [
        { text: 'Meet Artists', link: '/artists', type: 'primary' },
        { text: 'Join Now', link: '/signup', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%204.jpg',
      title: 'Gond Art Collection',
      description: 'Explore contemporary abstract paintings that challenge perception and inspire creativity.',
      buttons: [
        { text: 'View Collection', link: '/gallery', type: 'primary' },
        { text: 'Bid Now', link: '/auctions', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%205.jpg',
      title: 'Traditional Masterpieces',
      description: 'Discover paintings that capture the essence of every season with stunning color palettes.',
      buttons: [
        { text: 'Browse Seasons', link: '/gallery', type: 'primary' },
        { text: 'Meet Artists', link: '/artists', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%206.jpg',
      title: 'Abstract Wonders',
      description: 'Journey through breathtaking landscapes captured by talented local artists.',
      buttons: [
        { text: 'Explore Landscapes', link: '/gallery', type: 'primary' },
        { text: 'Start Collecting', link: '/signup', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%207.jpeg',
      title: 'Traditional Heritage',
      description: 'Immerse yourself in the rich cultural heritage of Indian traditional art forms.',
      buttons: [
        { text: 'Discover Heritage', link: '/gallery', type: 'primary' },
        { text: 'Learn More', link: '/about', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%208.jpg',
      title: 'Contemporary Fusion',
      description: 'Where traditional techniques meet modern artistic expression in stunning harmony.',
      buttons: [
        { text: 'View Modern Art', link: '/gallery', type: 'primary' },
        { text: 'Join Community', link: '/signup', type: 'outline' }
      ]
    },
    {
      image: '/images/new%20images/painting%209.jpg',
      title: 'Artistic Excellence',
      description: 'Celebrate the pinnacle of Indian artistic achievement with our curated collection.',
      buttons: [
        { text: 'Premium Collection', link: '/gallery', type: 'primary' },
        { text: 'Exclusive Auctions', link: '/auctions', type: 'outline' }
      ]
    }
  ]

  const featuredArtworks = [
    {
      id: 'painting1',
      name: 'Madhubani Raga',
      artist: 'Pooja Sharma',
      price: 33750,
      image: '/images/new images/painting 1.webp',
      auction: 'Live Auction'
    },
    {
      id: 'painting2',
      name: 'Chitrakala',
      artist: 'Rajesh Kumar',
      price: 51000,
      image: '/images/new images/painting 2.jpg',
      auction: 'Live Auction'
    },
    {
      id: 'painting3',
      name: 'Kalamkari Samudra',
      artist: 'Meera Patel',
      price: 24000,
      image: '/images/new images/painting 3.jpg',
      auction: 'Ending Soon'
    },
    {
      id: 'painting4',
      name: 'Gond Sangeet',
      artist: 'Vikram Mehta',
      price: 39500,
      image: '/images/new images/painting 4.jpg',
      auction: 'Fixed Price'
    },
    {
      id: 'painting5',
      name: 'Yuddh Raag',
      artist: 'Ananya Roy',
      price: 29500,
      image: '/images/new images/painting 5.jpg',
      auction: 'Fixed Price'
    },
    {
      id: 'painting6',
      name: 'Abstrakt Bharat',
      artist: 'Ravi Kumar',
      price: 27300,
      image: '/images/new images/painting 6.jpg',
      auction: 'Live Auction'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Increased to 6 seconds since we have more slides
    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    // Initialize slider on component mount
    setCurrentSlide(0)
    
    // Preload images for better performance
    slides.forEach(slide => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  const handleAddToCart = (artwork) => {
    addToCart(artwork)
    showNotification(`${artwork.name} added to cart!`, 'success')
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          <div className="hero-slides">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ 
                  backgroundImage: `url(${slide.image}), linear-gradient(135deg, #6a11cb, #2575fc)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="container">
                  <div className="hero-content">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <div className="hero-buttons">
                      {slide.buttons.map((button, btnIndex) => (
                        <Link
                          key={btnIndex}
                          to={button.link}
                          className={`btn btn-${button.type}`}
                        >
                          {button.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="hero-nav prev" onClick={prevSlide}>&#10094;</button>
          <button className="hero-nav next" onClick={nextSlide}>&#10095;</button>
          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                title={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="featured-artworks">
        <div className="container">
          <div className="section-header">
            <h2>Featured Paintings</h2>
            <Link to="/gallery" className="view-all">View All</Link>
          </div>
          <div className="artwork-grid">
            {featuredArtworks.map((artwork) => (
              <div key={artwork.id} className="artwork-card">
                <img src={artwork.image} alt={artwork.name} />
                <div className="artwork-info">
                  <h3>{artwork.name}</h3>
                  <p className="artist">By {artwork.artist}</p>
                  <div className="artwork-meta">
                    <span className="price">₹{artwork.price.toLocaleString()}</span>
                    <span className="auction">{artwork.auction}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link 
                      to={`/artwork/${artwork.id}`}
                      className="btn btn-outline"
                      style={{ 
                        flex: 1, 
                        textAlign: 'center', 
                        textDecoration: 'none', 
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      👁️ View Details
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(artwork)}
                      style={{ 
                        flex: 1, 
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse Paintings</h3>
              <p>Explore our gallery of Indian paintings from talented artists across India.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Join Auctions</h3>
              <p>Participate in real-time auctions or purchase paintings at fixed prices.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Win & Collect</h3>
              <p>Secure your favorite paintings and arrange for delivery or pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Collecting?</h2>
            <p>Join thousands of art lovers who have discovered amazing paintings through our platform.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home