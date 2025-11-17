import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNotification } from '../hooks/useNotification'
import Notification from '../components/Notification'
import Reviews from '../components/Reviews'

const ArtistProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { notification, showNotification, hideNotification } = useNotification()
  const [activeTab, setActiveTab] = useState('artworks')

  // Mock artist database - in a real app, this would come from an API
  const artistDatabase = {
    'pooja-sharma': {
      id: 'pooja-sharma',
      name: 'Pooja Sharma',
      profileImage: '/images/artists/artist1.svg',
      coverImage: '/images/new images/painting 1.webp',
      specialty: 'Madhubani Art',
      location: 'Bihar, India',
      experience: '15 years',
      artworks: 45,
      followers: 1250,
      bio: 'Pooja Sharma is a renowned Madhubani artist from Bihar, India. She has been practicing this traditional art form for over 15 years and has exhibited her work in galleries across India and internationally. Her paintings are known for their intricate patterns, vibrant colors, and deep cultural significance.',
      education: 'Bachelor of Fine Arts, Patna University',
      achievements: [
        'National Award for Traditional Arts (2022)',
        'Featured in International Folk Art Exhibition, New York (2021)',
        'Padma Shri Nominee (2023)',
        'UNESCO Cultural Heritage Ambassador (2020)'
      ],
      exhibitions: [
        'Solo Exhibition - "Colors of Mithila" at India Habitat Centre, Delhi (2023)',
        'Group Exhibition - "Folk Traditions" at National Gallery, Mumbai (2022)',
        'International Folk Art Festival, Paris (2021)',
        'Contemporary Indian Art Show, London (2020)'
      ],
      techniques: ['Traditional Madhubani', 'Contemporary Fusion', 'Natural Pigments', 'Handmade Paper'],
      socialMedia: {
        instagram: '@poojasharma_madhubani',
        facebook: 'Pooja Sharma Art',
        website: 'www.poojasharmaart.com'
      }
    },
    'rajesh-kumar': {
      id: 'rajesh-kumar',
      name: 'Rajesh Kumar',
      profileImage: '/images/artists/artist2.svg',
      coverImage: '/images/new images/painting 2.jpg',
      specialty: 'Rajput Miniature Paintings',
      location: 'Rajasthan, India',
      experience: '20 years',
      artworks: 38,
      followers: 980,
      bio: 'Rajesh Kumar is a master of Rajput miniature paintings, carrying forward the royal artistic traditions of Rajasthan. His detailed work captures the grandeur of Rajput courts and the beauty of Rajasthani culture.',
      education: 'Master of Fine Arts, Rajasthan University',
      achievements: [
        'State Award for Miniature Painting (2021)',
        'Heritage Arts Excellence Award (2020)',
        'Featured Artist at Jaipur Literature Festival (2022)'
      ],
      exhibitions: [
        'Royal Heritage Exhibition, Udaipur (2023)',
        'Miniature Marvels, Jaipur (2022)',
        'Traditional Arts of India, Chennai (2021)'
      ],
      techniques: ['Miniature Painting', 'Gold Leaf Work', 'Natural Pigments', 'Traditional Brushwork'],
      socialMedia: {
        instagram: '@rajeshkumar_miniatures',
        facebook: 'Rajesh Kumar Art',
        website: 'www.rajeshkumarart.com'
      }
    },
    'meera-patel': {
      id: 'meera-patel',
      name: 'Meera Patel',
      profileImage: '/images/artists/artist3.svg',
      coverImage: '/images/new images/painting 3.jpg',
      specialty: 'Kalamkari Art',
      location: 'Andhra Pradesh, India',
      experience: '12 years',
      artworks: 32,
      followers: 750,
      bio: 'Meera Patel is an expert in Kalamkari art, specializing in hand-painted textiles and paintings using natural dyes. Her work preserves the ancient traditions while incorporating contemporary themes.',
      education: 'Diploma in Textile Design, NIFT Hyderabad',
      achievements: [
        'Craft Excellence Award (2022)',
        'Young Artist Recognition (2020)',
        'Traditional Craft Promotion Award (2021)'
      ],
      exhibitions: [
        'Kalamkari Heritage Show, Hyderabad (2023)',
        'Natural Dye Art Exhibition, Bangalore (2022)',
        'Handloom and Handicraft Fair, Delhi (2021)'
      ],
      techniques: ['Hand-painted Kalamkari', 'Block Printing', 'Natural Dyes', 'Textile Art'],
      socialMedia: {
        instagram: '@meerapatel_kalamkari',
        facebook: 'Meera Patel Kalamkari',
        website: 'www.meerapatelart.com'
      }
    }
  }

  const artist = artistDatabase[id] || artistDatabase['pooja-sharma']

  // Mock artworks by this artist
  const artistArtworks = [
    {
      id: '1',
      name: 'Madhubani Raga',
      price: 33750,
      image: '/images/new images/painting 1.webp',
      status: 'Available'
    },
    {
      id: '4',
      name: 'Gond Celebration',
      price: 38000,
      image: '/images/new images/painting 4.jpg',
      status: 'In Auction'
    },
    {
      id: '5',
      name: 'Yuddh Raag',
      price: 32000,
      image: '/images/new images/painting 5.jpg',
      status: 'Available'
    }
  ]

  const handleAddToCart = (artwork) => {
    if (artwork.status === 'Available') {
      addToCart(artwork)
      showNotification(`${artwork.name} added to cart!`, 'success')
    } else {
      showNotification(`${artwork.name} is not available for purchase`, 'error')
    }
  }

  const handleFollowArtist = () => {
    showNotification(`You are now following ${artist.name}!`, 'success')
  }

  return (
    <div className="artist-profile-container" style={{ 
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
      
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Breadcrumb */}
        <div style={{ 
          marginBottom: '30px', 
          fontSize: '14px', 
          color: '#666',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '12px 20px',
          borderRadius: '25px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'inline-block'
        }}>
          <Link to="/" style={{ color: '#6a11cb', textDecoration: 'none', fontWeight: '500' }}>🏠 Home</Link>
          <span style={{ margin: '0 8px', color: '#ccc' }}>•</span>
          <Link to="/artists" style={{ color: '#6a11cb', textDecoration: 'none', fontWeight: '500' }}>👨‍🎨 Artists</Link>
          <span style={{ margin: '0 8px', color: '#ccc' }}>•</span>
          <span style={{ fontWeight: '600', color: '#333' }}>{artist.name}</span>
        </div>

        {/* Artist Header */}
        <div className="artist-header" style={{
          background: `linear-gradient(135deg, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9)), url(${artist.coverImage}) center/cover`,
          borderRadius: '25px',
          padding: '60px 40px',
          color: 'white',
          marginBottom: '40px',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={artist.profileImage}
                alt={artist.name}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  border: '5px solid rgba(255, 255, 255, 0.9)',
                  objectFit: 'cover',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '20px',
                height: '20px',
                background: '#28a745',
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}></div>
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '3.5rem', 
                marginBottom: '15px',
                fontWeight: '700',
                textShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                background: 'linear-gradient(45deg, #ffffff, #f8f9fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {artist.name}
              </h1>
              <p style={{ 
                fontSize: '1.4rem', 
                marginBottom: '20px', 
                opacity: 0.95,
                fontWeight: '500',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                🎨 {artist.specialty}
              </p>
              <p style={{ 
                fontSize: '1.2rem', 
                marginBottom: '25px', 
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  📍 {artist.location}
                </span>
                <span style={{ opacity: 0.7 }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  ⏱️ {artist.experience} experience
                </span>
              </p>
              
              <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '20px',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: '100px'
                }}>
                  <div style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: 'bold',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}>
                    {artist.artworks}
                  </div>
                  <div style={{ 
                    fontSize: '1rem', 
                    opacity: 0.9,
                    fontWeight: '500',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                    Artworks
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '20px',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: '100px'
                }}>
                  <div style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: 'bold',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}>
                    {artist.followers}
                  </div>
                  <div style={{ 
                    fontSize: '1rem', 
                    opacity: 0.9,
                    fontWeight: '500',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                    Followers
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '20px',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: '120px'
                }}>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}>
                    {artist.experience}
                  </div>
                  <div style={{ 
                    fontSize: '1rem', 
                    opacity: 0.9,
                    fontWeight: '500',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                    Experience
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={handleFollowArtist}
                  style={{ 
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#6a11cb',
                    border: 'none',
                    borderRadius: '50px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)'
                    e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  ❤️ Follow Artist
                </button>
                <button 
                  className="btn btn-outline"
                  style={{ 
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  💬 Contact Artist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '5px', 
          marginBottom: '40px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {[
            { id: 'artworks', label: 'Artworks', count: artistArtworks.length },
            { id: 'about', label: 'About', count: null },
            { id: 'exhibitions', label: 'Exhibitions', count: artist.exhibitions.length },
            { id: 'achievements', label: 'Achievements', count: artist.achievements.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '15px 25px',
                border: 'none',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #6a11cb, #2575fc)' 
                  : 'transparent',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                borderRadius: '15px',
                color: activeTab === tab.id ? 'white' : '#666',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 8px 25px rgba(106, 17, 203, 0.3)' : 'none',
                transform: activeTab === tab.id ? 'translateY(-2px)' : 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(106, 17, 203, 0.1)'
                  e.target.style.color = '#6a11cb'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#666'
                }
              }}
            >
              {tab.label} {tab.count && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'artworks' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#333' }}>Artworks by {artist.name}</h3>
            </div>
            
            <div className="artwork-grid">
              {artistArtworks.map((artwork) => (
                <div key={artwork.id} className="artwork-card">
                  <div style={{ position: 'relative' }}>
                    <img src={artwork.image} alt={artwork.name} />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: artwork.status === 'Available' ? '#28a745' : 
                                 artwork.status === 'In Auction' ? '#ffc107' : '#dc3545',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {artwork.status}
                    </div>
                  </div>
                  <div className="artwork-info">
                    <h3>{artwork.name}</h3>
                    <p className="artist">By {artist.name}</p>
                    <div className="artwork-meta">
                      <span className="price">₹{artwork.price.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <Link 
                        to={`/artwork/${artwork.id}`}
                        className="btn btn-outline"
                        style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '14px' }}
                      >
                        View Details
                      </Link>
                      {artwork.status === 'Available' && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(artwork)}
                          style={{ flex: 1, fontSize: '14px' }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>About {artist.name}</h3>
              <p style={{ lineHeight: '1.8', marginBottom: '30px', fontSize: '1.1rem', color: '#555' }}>
                {artist.bio}
              </p>
              
              <h4 style={{ marginBottom: '15px', color: '#6a11cb' }}>Education</h4>
              <p style={{ marginBottom: '30px', color: '#555' }}>{artist.education}</p>
              
              <h4 style={{ marginBottom: '15px', color: '#6a11cb' }}>Techniques & Specializations</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                {artist.techniques.map((technique, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ 
                background: 'white', 
                padding: '25px', 
                borderRadius: '15px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                marginBottom: '25px'
              }}>
                <h4 style={{ marginBottom: '20px', color: '#333' }}>Connect with {artist.name}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a 
                    href={`https://instagram.com/${artist.socialMedia.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#333',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📷 {artist.socialMedia.instagram}
                  </a>
                  <a 
                    href={`https://facebook.com/${artist.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#333',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📘 {artist.socialMedia.facebook}
                  </a>
                  <a 
                    href={`https://${artist.socialMedia.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#333',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🌐 {artist.socialMedia.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exhibitions' && (
          <div>
            <h3 style={{ marginBottom: '30px', color: '#333' }}>Exhibitions & Shows</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {artist.exhibitions.map((exhibition, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderLeft: '4px solid #6a11cb'
                  }}
                >
                  <h4 style={{ marginBottom: '10px', color: '#333' }}>{exhibition}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    A significant showcase of {artist.name}'s artistic journey and cultural contributions.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h3 style={{ marginBottom: '30px', color: '#333' }}>Awards & Recognition</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {artist.achievements.map((achievement, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #fff, #f8f9fa)',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    border: '1px solid #e1e5e9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    🏆
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', color: '#333' }}>{achievement}</h4>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                      Recognition for outstanding contribution to traditional Indian art forms.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <Reviews itemId={id} itemType="artist" />
      </div>
    </div>
  )
}

export default ArtistProfile