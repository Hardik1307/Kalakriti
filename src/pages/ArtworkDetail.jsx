import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNotification } from '../hooks/useNotification'
import Notification from '../components/Notification'

const ArtworkDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { notification, showNotification, hideNotification } = useNotification()
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock artwork database - in a real app, this would come from an API
  const artworkDatabase = {
    '1': {
      id: '1',
      name: 'Madhubani Raga',
      artist: 'Pooja Sharma',
      artistId: 'pooja-sharma',
      price: 33750,
      images: [
        '/images/new images/painting 1.webp',
        '/images/artworks/detail-thumb1.svg',
        '/images/artworks/detail-thumb2.svg'
      ],
      description: 'A beautiful Madhubani painting that captures the essence of traditional Indian folk art. This piece features intricate patterns and vibrant colors that tell a story of cultural heritage and artistic excellence. The artwork showcases the traditional Mithila art form with its characteristic geometric patterns and nature motifs.',
      dimensions: '24" x 36"',
      medium: 'Acrylic on Canvas',
      year: '2024',
      category: 'Madhubani',
      availability: 'In Stock',
      technique: 'Traditional Madhubani',
      origin: 'Bihar, India',
      certification: 'Authentic',
      condition: 'Excellent'
    },
    '2': {
      id: '2',
      name: 'Rajput Virasat',
      artist: 'Rajesh Kumar',
      artistId: 'rajesh-kumar',
      price: 51000,
      images: [
        '/images/new images/painting 2.jpg',
        '/images/artworks/detail-thumb3.svg',
        '/images/artworks/detail-thumb4.svg'
      ],
      description: 'An exquisite Rajput miniature painting depicting royal court scenes with intricate details and rich colors. This masterpiece represents the grandeur of Rajasthani art traditions.',
      dimensions: '18" x 24"',
      medium: 'Watercolor on Paper',
      year: '2024',
      category: 'Rajput',
      availability: 'In Stock',
      technique: 'Miniature Painting',
      origin: 'Rajasthan, India',
      certification: 'Authentic',
      condition: 'Excellent'
    },
    '3': {
      id: '3',
      name: 'Kalamkari Samudra',
      artist: 'Meera Patel',
      artistId: 'meera-patel',
      price: 24000,
      images: [
        '/images/new images/painting 3.jpg',
        '/images/artworks/painting1.svg',
        '/images/artworks/painting2.svg'
      ],
      description: 'A stunning Kalamkari artwork featuring ocean themes with hand-painted details using natural dyes. This piece showcases the ancient art of hand-painting and block-printing.',
      dimensions: '20" x 30"',
      medium: 'Natural Dyes on Cotton',
      year: '2024',
      category: 'Kalamkari',
      availability: 'In Stock',
      technique: 'Hand-painted Kalamkari',
      origin: 'Andhra Pradesh, India',
      certification: 'Authentic',
      condition: 'Excellent'
    }
  }

  const artwork = artworkDatabase[id] || artworkDatabase['1']

  const handleAddToCart = () => {
    addToCart(artwork)
    showNotification(`${artwork.name} added to cart!`, 'success')
  }

  const relatedArtworks = [
    {
      id: '2',
      name: 'Rajput Heritage',
      artist: 'Pooja Sharma',
      price: 45000,
      image: '/images/new images/painting 2.jpg',
      auction: 'Fixed Price'
    },
    {
      id: '4',
      name: 'Gond Celebration',
      artist: 'Pooja Sharma',
      price: 38000,
      image: '/images/new images/painting 4.jpg',
      auction: 'Live Auction'
    },
    {
      id: '5',
      name: 'Pattachitra Dreams',
      artist: 'Pooja Sharma',
      price: 32000,
      image: '/images/new images/painting 5.jpg',
      auction: 'Fixed Price'
    }
  ]

  return (
    <div className="artwork-detail-container" style={{ 
      paddingTop: '40px', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Breadcrumb */}
        <div style={{ 
          marginBottom: '40px', 
          fontSize: '14px', 
          color: '#666',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px 25px',
          borderRadius: '30px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'inline-block',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <Link to="/" style={{ color: '#6a11cb', textDecoration: 'none', fontWeight: '500' }}>🏠 Home</Link>
          <span style={{ margin: '0 10px', color: '#ccc' }}>•</span>
          <Link to="/gallery" style={{ color: '#6a11cb', textDecoration: 'none', fontWeight: '500' }}>🖼️ Gallery</Link>
          <span style={{ margin: '0 10px', color: '#ccc' }}>•</span>
          <span style={{ fontWeight: '600', color: '#333' }}>{artwork.name}</span>
        </div>

        <div className="artwork-detail-card artwork-detail-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          gap: '60px', 
          alignItems: 'start',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '40px',
          borderRadius: '25px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          {/* Artwork Images */}
          <div>
            {/* Main Image */}
            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <img 
                src={artwork.images[selectedImage]} 
                alt={artwork.name}
                style={{ 
                  width: '100%', 
                  borderRadius: '20px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                  cursor: 'zoom-in',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              {/* Image overlay with zoom icon */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                🔍
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              {artwork.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${artwork.name} view ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: selectedImage === index ? '4px solid #6a11cb' : '3px solid #e1e5e9',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedImage === index ? '0 8px 25px rgba(106, 17, 203, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transform: selectedImage === index ? 'translateY(-5px)' : 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedImage !== index) {
                      e.target.style.transform = 'translateY(-3px)'
                      e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedImage !== index) {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Artwork Details */}
          <div>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '15px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2'
            }}>
              {artwork.name}
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              color: '#666', 
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              By 
              <Link 
                to={`/artist/${artwork.artistId}`} 
                style={{ 
                  color: '#6a11cb', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  padding: '5px 12px',
                  background: 'rgba(106, 17, 203, 0.1)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(106, 17, 203, 0.2)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(106, 17, 203, 0.1)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                👨‍🎨 {artwork.artist}
              </Link>
            </p>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', 
              padding: '30px', 
              borderRadius: '20px', 
              marginBottom: '35px',
              border: '2px solid rgba(106, 17, 203, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative element */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(106, 17, 203, 0.05) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '15px'
                }}>
                  ₹{artwork.price.toLocaleString()}
                </div>
                <div style={{ 
                  color: artwork.availability === 'In Stock' ? '#28a745' : '#dc3545', 
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {artwork.availability === 'In Stock' ? '✅' : '❌'} {artwork.availability}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ 
                marginBottom: '20px',
                fontSize: '1.5rem',
                color: '#333',
                fontWeight: '600'
              }}>
                📝 Description
              </h3>
              <p style={{ 
                lineHeight: '1.8',
                fontSize: '1.1rem',
                color: '#555',
                background: 'rgba(248, 249, 250, 0.8)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(106, 17, 203, 0.1)'
              }}>
                {artwork.description}
              </p>
            </div>

            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ 
                marginBottom: '25px',
                fontSize: '1.5rem',
                color: '#333',
                fontWeight: '600'
              }}>
                🎨 Artwork Details
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '20px',
                background: 'rgba(248, 249, 250, 0.8)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(106, 17, 203, 0.1)'
              }}>
                {[
                  { label: 'Dimensions', value: artwork.dimensions, icon: '📏' },
                  { label: 'Medium', value: artwork.medium, icon: '🎭' },
                  { label: 'Year', value: artwork.year, icon: '📅' },
                  { label: 'Category', value: artwork.category, icon: '🏷️' },
                  { label: 'Technique', value: artwork.technique, icon: '✨' },
                  { label: 'Origin', value: artwork.origin, icon: '🌍' },
                  { label: 'Certification', value: artwork.certification, icon: '🏆' },
                  { label: 'Condition', value: artwork.condition, icon: '💎' }
                ].map((detail, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    padding: '15px',
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <strong style={{ 
                      color: '#6a11cb', 
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.95rem'
                    }}>
                      {detail.icon} {detail.label}:
                    </strong>
                    <span style={{ color: '#333', fontWeight: '500' }}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
              <button 
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ 
                  flex: 1, 
                  padding: '18px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  border: 'none',
                  boxShadow: '0 8px 25px rgba(106, 17, 203, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)'
                  e.target.style.boxShadow = '0 12px 35px rgba(106, 17, 203, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 25px rgba(106, 17, 203, 0.3)'
                }}
              >
                🛒 Add to Cart
              </button>
              <button 
                className="btn btn-outline"
                style={{ 
                  flex: 1,
                  padding: '18px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '15px',
                  border: '2px solid #6a11cb',
                  color: '#6a11cb',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#6a11cb'
                  e.target.style.color = 'white'
                  e.target.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#6a11cb'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                ❤️ Add to Wishlist
              </button>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/auctions')}
                style={{ 
                  flex: 1, 
                  padding: '15px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '12px',
                  border: '2px solid #e1e5e9',
                  color: '#666',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.color = '#6a11cb'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e1e5e9'
                  e.target.style.color = '#666'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                🔨 View in Auction
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => navigate(`/artist/${artwork.artistId}`)}
                style={{ 
                  flex: 1, 
                  padding: '15px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '12px',
                  border: '2px solid #e1e5e9',
                  color: '#666',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.color = '#6a11cb'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e1e5e9'
                  e.target.style.color = '#666'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                👤 View Artist Profile
              </button>
            </div>

            <div style={{ 
              padding: '25px', 
              background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)', 
              borderRadius: '20px',
              border: '2px solid rgba(255, 193, 7, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative element */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-15%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ 
                  marginBottom: '20px', 
                  color: '#856404',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  🚚 Shipping & Delivery
                </h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    '✅ Free shipping on all orders above ₹20,000',
                    '📦 Secure packaging with insurance included',
                    '⏰ Delivery within 5-7 business days',
                    '🏆 Certificate of authenticity included',
                    '🔒 100% secure and insured delivery'
                  ].map((item, index) => (
                    <div key={index} style={{
                      fontSize: '1rem',
                      color: '#856404',
                      fontWeight: '500',
                      padding: '8px 0'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        <div style={{ marginTop: '80px' }}>
          <h3 style={{ marginBottom: '30px' }}>More from this Artist</h3>
          <div className="artwork-grid">
            {/* You can add more artworks here */}
            <div className="artwork-card">
              <img src="/images/new images/painting 2.jpg" alt="Related Artwork" />
              <div className="artwork-info">
                <h3>Rajput Heritage</h3>
                <p className="artist">By Pooja Sharma</p>
                <div className="artwork-meta">
                  <span className="price">₹45,000</span>
                  <span className="auction">Fixed Price</span>
                </div>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkDetail