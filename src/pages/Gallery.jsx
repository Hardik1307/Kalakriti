import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useNotification } from '../hooks/useNotification'
import Notification from '../components/Notification'

const Gallery = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { addToCart } = useCart()
  const { notification, showNotification, hideNotification } = useNotification()

  // Load custom paintings from localStorage
  const customPaintings = JSON.parse(localStorage.getItem('customPaintings') || '[]')

  const defaultArtworks = [
    {
      id: 'painting1',
      name: 'Madhubani Raga',
      artist: 'Pooja Sharma',
      price: 33750,
      image: '/images/new images/painting 1.webp',
      category: 'madhubani',
      auction: 'Live Auction'
    },
    {
      id: 'painting2',
      name: 'Rajput Virasat',
      artist: 'Rajesh Kumar',
      price: 51000,
      image: '/images/new images/painting 2.jpg',
      category: 'rajput',
      auction: 'Live Auction'
    },
    {
      id: 'painting3',
      name: 'Kalamkari Samudra',
      artist: 'Meera Patel',
      price: 24000,
      image: '/images/new images/painting 3.jpg',
      category: 'kalamkari',
      auction: 'Ending Soon'
    },
    {
      id: 'painting4',
      name: 'Gond Sangeet',
      artist: 'Vikram Mehta',
      price: 39500,
      image: '/images/new images/painting 4.jpg',
      category: 'gond',
      auction: 'Fixed Price'
    },
    {
      id: 'painting5',
      name: 'Pattachitra Vasant',
      artist: 'Ananya Roy',
      price: 29500,
      image: '/images/new images/painting 5.jpg',
      category: 'pattachitra',
      auction: 'Fixed Price'
    },
    {
      id: 'painting6',
      name: 'Pahadi Jheel',
      artist: 'Ravi Kumar',
      price: 27300,
      image: '/images/new images/painting 6.jpg',
      category: 'pahadi',
      auction: 'Live Auction'
    },
    {
      id: 'painting7',
      name: 'Thar Suryoday',
      artist: 'Priya Sharma',
      price: 37400,
      image: '/images/new images/painting 7.jpeg',
      category: 'landscape',
      auction: 'Live Auction'
    },
    {
      id: 'painting8',
      name: 'Warli Celebration',
      artist: 'Amit Desai',
      price: 31200,
      image: '/images/new images/painting 8.jpg',
      category: 'warli',
      auction: 'Fixed Price'
    }
  ]

  // Combine default artworks with custom paintings
  const artworks = [
    ...defaultArtworks,
    ...customPaintings.map(painting => ({
      ...painting,
      category: painting.category.toLowerCase()
    }))
  ]

  const categories = [
    { id: 'all', name: 'All Paintings' },
    { id: 'madhubani', name: 'Madhubani' },
    { id: 'rajput', name: 'Rajput' },
    { id: 'kalamkari', name: 'Kalamkari' },
    { id: 'gond', name: 'Gond' },
    { id: 'pattachitra', name: 'Pattachitra' },
    { id: 'pahadi', name: 'Pahadi' },
    { id: 'warli', name: 'Warli' },
    { id: 'landscape', name: 'Landscape' }
  ]

  // Search suggestions based on available data
  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return []
    
    const suggestions = new Set()
    const term = searchTerm.toLowerCase()
    
    artworks.forEach(artwork => {
      if (artwork.name.toLowerCase().includes(term)) {
        suggestions.add(artwork.name)
      }
      if (artwork.artist.toLowerCase().includes(term)) {
        suggestions.add(artwork.artist)
      }
      if (artwork.category.toLowerCase().includes(term)) {
        suggestions.add(artwork.category)
      }
    })
    
    return Array.from(suggestions).slice(0, 5)
  }

  // Filter artworks based on category and search term
  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = filter === 'all' || artwork.category === filter
    const matchesSearch = searchTerm === '' || 
      artwork.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (artwork) => {
    addToCart(artwork)
    showNotification(`${artwork.name} added to cart!`, 'success')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center fixed',
      backgroundSize: 'cover',
      position: 'relative'
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(245, 247, 250, 0.9) 0%, rgba(228, 237, 245, 0.9) 100%)',
        zIndex: -1
      }} />
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      <div className="featured-artworks" style={{
        background: 'linear-gradient(rgba(248, 249, 250, 0.95), rgba(233, 236, 239, 0.95)), url("https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center/cover',
        padding: '80px 0',
        position: 'relative'
      }}>
        <div className="container">
          <div className="section-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: '#333' }}>Art Gallery</h2>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>Discover beautiful Indian paintings from talented artists</p>
            </div>
            <Link 
              to="/add-painting"
              className="btn btn-primary"
              style={{
                padding: '12px 25px',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              ➕ Add Your Painting
            </Link>
          </div>

          {/* Gallery Controls */}
          <div className="gallery-controls" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'flex-end',
            marginBottom: '40px'
          }}>
            {/* Search Container */}
            <div className="search-container" style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '500px',
              marginBottom: '15px'
            }}>
              <div style={{ display: 'flex', marginBottom: '10px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search artworks, artists, or categories..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(e.target.value.length > 0)
                }}
                style={{
                  padding: '12px 20px',
                  border: '2px solid #6a11cb',
                  borderRadius: '30px 0 0 30px',
                  backgroundColor: 'white',
                  color: '#333',
                  fontWeight: '500',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2575fc'
                  e.target.style.boxShadow = '0 0 0 4px rgba(106, 17, 203, 0.1), 0 8px 25px rgba(0, 0, 0, 0.1)'
                  setShowSuggestions(searchTerm.length > 0)
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#6a11cb'
                  e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)'
                  // Delay hiding suggestions to allow clicking on them
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowSuggestions(false)
                    if (searchTerm.trim()) {
                      showNotification(`Searching for "${searchTerm}"...`, 'info')
                    }
                  }
                }}
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && getSearchSuggestions().length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: '80px',
                  background: 'white',
                  border: '2px solid #6a11cb',
                  borderTop: 'none',
                  borderRadius: '0 0 15px 15px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {getSearchSuggestions().map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion)
                        setShowSuggestions(false)
                        showNotification(`Searching for "${suggestion}"...`, 'info')
                      }}
                      style={{
                        padding: '12px 20px',
                        cursor: 'pointer',
                        borderBottom: index < getSearchSuggestions().length - 1 ? '1px solid #f0f0f0' : 'none',
                        transition: 'background-color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <span style={{ color: '#6a11cb' }}>🔍</span>
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
              <button 
                className="search-btn" 
                onClick={() => {
                  // Optional: Add search analytics or additional search logic here
                  if (searchTerm.trim()) {
                    showNotification(`Searching for "${searchTerm}"...`, 'info')
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 30px 30px 0',
                  padding: '0 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #2575fc, #6a11cb)'
                  e.target.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)'
                  e.target.style.transform = 'scale(1)'
                }}
              >
                🔍
              </button>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginLeft: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#c82333'}
                  onMouseLeave={(e) => e.target.style.background = '#dc3545'}
                >
                  ✕ Clear
                </button>
              )}
              </div>
              
              {/* Search Results Info */}
              {(searchTerm || filter !== 'all') && (
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  <span>
                    {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} found
                  </span>
                  {searchTerm && (
                    <span style={{ 
                      background: 'rgba(106, 17, 203, 0.1)', 
                      padding: '4px 8px', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#6a11cb'
                    }}>
                      for "{searchTerm}"
                    </span>
                  )}
                  {filter !== 'all' && (
                    <span style={{ 
                      background: 'rgba(37, 117, 252, 0.1)', 
                      padding: '4px 8px', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#2575fc'
                    }}>
                      in {categories.find(c => c.id === filter)?.name || filter}
                    </span>
                  )}
                </div>
              )}
              
              {/* Quick Search Tags - Show when no search term */}
              {!searchTerm && (
                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginTop: '8px'
                }}>
                  <span>Popular searches:</span>
                  {['Madhubani', 'Rajput', 'Pooja Sharma', 'Traditional'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(term)
                        showNotification(`Searching for "${term}"...`, 'info')
                      }}
                      style={{
                        background: 'rgba(106, 17, 203, 0.05)',
                        border: '1px solid rgba(106, 17, 203, 0.2)',
                        color: '#6a11cb',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(106, 17, 203, 0.1)'
                        e.target.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(106, 17, 203, 0.05)'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="gallery-filters" style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '15px'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className="filter-select"
                  style={{
                    padding: '10px 15px',
                    borderRadius: '30px',
                    border: '2px solid #6a11cb',
                    backgroundColor: filter === category.id ? '#6a11cb' : 'white',
                    color: filter === category.id ? 'white' : '#333',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (filter !== category.id) {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== category.id) {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Artworks Grid */}
          <div className="artwork-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="artwork-card" style={{
                background: '#fff',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s ease',
                position: 'relative',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                cursor: 'pointer'
              }}>
                <img src={artwork.image} alt={artwork.name} style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }} />
                <div className="artwork-info" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{artwork.name}</h3>
                  <p className="artist" style={{ color: '#666', marginBottom: '15px' }}>By {artwork.artist}</p>
                  <div className="artwork-meta" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span className="price" style={{
                      fontWeight: '700',
                      fontSize: '1.2rem',
                      color: '#6A0572'
                    }}>₹{artwork.price.toLocaleString()}</span>
                    <span className="auction" style={{
                      background: 'linear-gradient(90deg, #FF6B6B, #FFD166)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      boxShadow: '0 4px 10px rgba(255, 107, 107, 0.3)'
                    }}>{artwork.auction}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
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
                      className="btn btn-primary add-to-cart-btn"
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

          {filteredArtworks.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎨</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#333' }}>
                {searchTerm ? 'No artworks found' : 'No paintings found in this category'}
              </h3>
              <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '25px' }}>
                {searchTerm 
                  ? `No results found for "${searchTerm}". Try different keywords or browse all artworks.`
                  : 'Try selecting a different category or browse all paintings.'
                }
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="btn btn-primary"
                    style={{ padding: '12px 25px' }}
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => {
                    setFilter('all')
                    setSearchTerm('')
                  }}
                  className="btn btn-outline"
                  style={{ padding: '12px 25px' }}
                >
                  Show All Artworks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Gallery