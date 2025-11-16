import { Link } from 'react-router-dom'

const Artists = () => {
  const artists = [
    {
      id: 1,
      name: 'Anjali Sharma',
      specialty: 'Contemporary artist specializing in Madhubani paintings.',
      image: 'https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FezR2jRsQ45ipn7fOeVefFw%252Fpooja.jpg&width=910',
      artworks: 42,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      specialty: 'Master of Tanjore painting style with gold leaf techniques.',
      image: 'https://i.ytimg.com/vi/3clUf6YEy_0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAUDJecDe2BIpLs41dY1nPXlqTOow',
      artworks: 28,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Meera Patel',
      specialty: 'Contemporary Warli artist with modern storytelling themes.',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQE__Ac7aFVu7g/profile-displayphoto-shrink_400_400/B4EZWva9UrGgAg-/0/1742404834950?e=2147483647&v=beta&t=0hkFjRqYIXVEKIoIL7evGaft6VKQd0r1ctSU6N5EaVA',
      artworks: 35,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Arun Verma',
      specialty: 'Miniature painter inspired by Mughal and Rajput traditions.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      artworks: 19,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Sunita Rao',
      specialty: 'Kalamkari artist specializing in hand-painted textiles.',
      image: '/images/artists/img.jpg',
      artworks: 24,
      rating: 4.5
    },
    {
      id: 6,
      name: 'Sanjay Sharma',
      specialty: 'Watercolor specialist focusing on botanical illustrations.',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
      artworks: 31,
      rating: 4.8
    }
  ]

  const handleViewProfile = (artistId) => {
    alert(`View profile functionality for artist ${artistId} would be implemented here!`)
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

      {/* Artists Hero */}
      <div className="artists-hero" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center/cover',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}>
            Discover Amazing Indian Artists
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
          }}>
            Explore talented Indian painters and their unique traditional and contemporary styles
          </p>
        </div>
      </div>

      {/* Artists Section */}
      <div className="artists-section" style={{
        background: 'linear-gradient(rgba(248, 249, 250, 0.95), rgba(233, 236, 239, 0.95)), url("https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80") no-repeat center center/cover',
        padding: '80px 0',
        position: 'relative'
      }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '50px',
            color: '#333'
          }}>Featured Indian Artists</h2>

          <div className="artists-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px'
          }}>
            {artists.map((artist) => (
              <div 
                key={artist.id} 
                className="artist-card" 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="artist-image"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover'
                  }}
                />
                <div className="artist-info" style={{
                  padding: '20px',
                  display: 'block',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '10px',
                    color: '#333'
                  }}>
                    {artist.name}
                  </h3>
                  <p style={{
                    color: '#666',
                    marginBottom: '15px'
                  }}>
                    {artist.specialty}
                  </p>
                  <div className="artist-stats" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '15px'
                  }}>
                    <div className="stat" style={{ textAlign: 'center' }}>
                      <div className="stat-number" style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#6a11cb'
                      }}>
                        {artist.artworks}
                      </div>
                      <div className="stat-label" style={{
                        fontSize: '0.9rem',
                        color: '#666'
                      }}>
                        Artworks
                      </div>
                    </div>
                    <div className="stat" style={{ textAlign: 'center' }}>
                      <div className="stat-number" style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#6a11cb'
                      }}>
                        {artist.rating}
                      </div>
                      <div className="stat-label" style={{
                        fontSize: '0.9rem',
                        color: '#666'
                      }}>
                        Rating
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <Link 
                      to={`/artist/${artist.name.toLowerCase().replace(' ', '-')}`}
                      className="btn btn-primary"
                      style={{ 
                        flex: 1, 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        fontSize: '14px'
                      }}
                    >
                      👤 View Profile
                    </Link>
                    <button
                      className="btn btn-outline"
                      style={{ 
                        flex: 1,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                      onClick={() => alert(`Following ${artist.name}!`)}
                    >
                      ❤️ Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Artists