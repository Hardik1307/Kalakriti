import { Link } from 'react-router-dom'

const About = () => {
  const stats = [
    { number: '500+', label: 'Artworks', icon: '🎨' },
    { number: '100+', label: 'Artists', icon: '👨‍🎨' },
    { number: '50+', label: 'Cities', icon: '🏙️' },
    { number: '1000+', label: 'Happy Customers', icon: '😊' }
  ]

  const artForms = [
    { name: 'Madhubani', region: 'Bihar', description: 'Traditional folk art with intricate patterns' },
    { name: 'Rajput Miniatures', region: 'Rajasthan', description: 'Royal court paintings with fine details' },
    { name: 'Kalamkari', region: 'Andhra Pradesh', description: 'Hand-painted textiles with natural dyes' },
    { name: 'Warli', region: 'Maharashtra', description: 'Tribal art depicting daily life' },
    { name: 'Gond', region: 'Madhya Pradesh', description: 'Colorful tribal art with nature themes' },
    { name: 'Pattachitra', region: 'Odisha', description: 'Traditional cloth-based scroll painting' }
  ]

  const team = [
    { name: 'Arjun Mehta', role: 'Founder & CEO', image: '👨‍💼', description: 'Art historian and technology enthusiast' },
    { name: 'Priya Sharma', role: 'Art Director', image: '👩‍🎨', description: 'Expert in traditional Indian art forms' },
    { name: 'Vikram Singh', role: 'Technology Lead', image: '👨‍💻', description: 'Building the future of art commerce' }
  ]

  return (
    <div style={{
      paddingTop: '40px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9)), url("/images/new images/painting 4.jpg") center/cover',
        padding: '100px 0',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
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

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '20px',
            fontWeight: '700',
            textShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
          }}>
            About Kalakriti
          </h1>
          <p style={{
            fontSize: '1.4rem',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0.95,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            Preserving India's Rich Artistic Heritage Through Digital Innovation
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '80px 20px' }}>
        {/* Mission Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          marginBottom: '80px'
        }}>
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our Mission
            </h2>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '25px'
            }}>
              Kalakriti is dedicated to preserving and promoting the rich tradition of Indian art.
              We provide a platform where talented artists can showcase their work and art enthusiasts
              can discover and collect authentic Indian paintings.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#666'
            }}>
              Our mission is to bridge the gap between traditional Indian art forms and modern
              collectors, ensuring that these beautiful cultural expressions continue to thrive
              in the digital age.
            </p>
          </div>
          <div>
            <img
              src="/images/new images/painting 4.jpg"
              alt="Indian Art"
              style={{
                width: '100%',
                borderRadius: '20px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          marginBottom: '80px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '2.2rem',
            color: '#333'
          }}>
            Our Impact
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius: '20px',
                transition: 'transform 0.3s ease',
                border: '2px solid rgba(106, 17, 203, 0.1)'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#6a11cb',
                  marginBottom: '10px'
                }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '1.1rem', color: '#666', fontWeight: '500' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          marginBottom: '80px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '2.2rem',
            color: '#333'
          }}>
            Why Choose Kalakriti?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #fff, #f8f9fa)',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
              border: '2px solid rgba(106, 17, 203, 0.1)'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎨</div>
              <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '1.3rem' }}>Authentic Art</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                All paintings are verified authentic works from skilled Indian artists.
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #fff, #f8f9fa)',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
              border: '2px solid rgba(106, 17, 203, 0.1)'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤝</div>
              <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '1.3rem' }}>Direct Support</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Your purchases directly support artists and their communities.
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #fff, #f8f9fa)',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
              border: '2px solid rgba(106, 17, 203, 0.1)'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
              <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '1.3rem' }}>Secure Transactions</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Safe and secure payment processing with buyer protection.
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #fff, #f8f9fa)',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
              border: '2px solid rgba(106, 17, 203, 0.1)'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚚</div>
              <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '1.3rem' }}>Safe Delivery</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Professional packaging and insured shipping for your artworks.
              </p>
            </div>
          </div>
        </div>

        {/* Art Forms Section */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '2.2rem',
            color: '#333'
          }}>
            Traditional Art Forms We Celebrate
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {artForms.map((art, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                border: '2px solid rgba(106, 17, 203, 0.1)'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h4 style={{
                  marginBottom: '10px',
                  color: '#6a11cb',
                  fontSize: '1.4rem'
                }}>
                  {art.name}
                </h4>
                <p style={{
                  color: '#2575fc',
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  fontWeight: '500'
                }}>
                  📍 {art.region}
                </p>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {art.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          marginBottom: '80px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '2.2rem',
            color: '#333'
          }}>
            Meet Our Team
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {team.map((member, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius: '20px',
                transition: 'transform 0.3s ease',
                border: '2px solid rgba(106, 17, 203, 0.1)'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  {member.image}
                </div>
                <h4 style={{
                  marginBottom: '10px',
                  color: '#333',
                  fontSize: '1.3rem'
                }}>
                  {member.name}
                </h4>
                <p style={{
                  color: '#6a11cb',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {member.role}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{
            marginBottom: '30px',
            fontSize: '2.2rem',
            color: '#333'
          }}>
            Our Story
          </h3>
          <p style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#555',
            marginBottom: '40px'
          }}>
            Founded in 2024, Kalakriti began as a passion project to celebrate the incredible
            diversity of Indian art forms. From the intricate patterns of Madhubani to the
            vibrant colors of Rajasthani miniatures, we believe every painting tells a story
            of India's rich cultural heritage. Today, we're proud to work with over 100 artists
            across India, helping them reach art lovers worldwide while preserving traditional
            techniques for future generations.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/gallery"
              className="btn btn-primary"
              style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              🖼️ Explore Gallery
            </Link>
            <Link
              to="/artists"
              className="btn btn-outline"
              style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              👨‍🎨 Meet Artists
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About