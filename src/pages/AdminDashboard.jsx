import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [artworks, setArtworks] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Check if user is admin
    const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || '{}')
    if (!currentUser.email || currentUser.role !== 'admin') {
      alert('Access denied! Admin only.')
      navigate('/')
      return
    }

    // Load data
    loadData()
  }, [navigate])

  const loadData = () => {
    // Load users (mock data + real users)
    const storedUsers = JSON.parse(localStorage.getItem('kalakriti_users') || '[]')
    setUsers(storedUsers)

    // Load artworks
    const customPaintings = JSON.parse(localStorage.getItem('customPaintings') || '[]')
    setArtworks(customPaintings)

    // Load orders
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
    setOrders(userOrders)
  }

  const deleteUser = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.email !== email)
      localStorage.setItem('kalakriti_users', JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
      alert('User deleted successfully!')
    }
  }

  const deleteArtwork = (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      const updatedArtworks = artworks.filter(a => a.id !== id)
      localStorage.setItem('customPaintings', JSON.stringify(updatedArtworks))
      setArtworks(updatedArtworks)
      alert('Artwork deleted successfully!')
    }
  }

  const stats = {
    totalUsers: users.length,
    totalArtworks: artworks.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
          🛡️ Admin Dashboard
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Manage users, artworks, and monitor platform activities
        </p>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
              {stats.totalUsers}
            </div>
            <div style={{ opacity: 0.9 }}>Total Users</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎨</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
              {stats.totalArtworks}
            </div>
            <div style={{ opacity: 0.9 }}>Total Artworks</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📦</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
              {stats.totalOrders}
            </div>
            <div style={{ opacity: 0.9 }}>Total Orders</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💰</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <div style={{ opacity: 0.9 }}>Total Revenue</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #f0f0f0',
            background: '#fafafa'
          }}>
            {['overview', 'users', 'artworks', 'orders'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '20px',
                  border: 'none',
                  background: activeTab === tab ? 'white' : 'transparent',
                  color: activeTab === tab ? '#6a11cb' : '#666',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #6a11cb' : 'none',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize',
                  fontSize: '1rem'
                }}
              >
                {tab === 'overview' && '📊 '}
                {tab === 'users' && '👥 '}
                {tab === 'artworks' && '🎨 '}
                {tab === 'orders' && '📦 '}
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: '30px' }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 style={{ marginBottom: '20px' }}>Platform Overview</h2>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
                    <h3 style={{ marginBottom: '15px', color: '#6a11cb' }}>Recent Activity</h3>
                    <p>✅ {orders.length} orders processed</p>
                    <p>✅ {artworks.length} artworks uploaded</p>
                    <p>✅ {users.length} registered users</p>
                    <p>✅ Platform running smoothly</p>
                  </div>
                  <div style={{ padding: '20px', background: '#e8f5e8', borderRadius: '10px' }}>
                    <h3 style={{ marginBottom: '15px', color: '#28a745' }}>System Status</h3>
                    <p>🟢 All systems operational</p>
                    <p>🟢 Database connected</p>
                    <p>🟢 Payment gateway active</p>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 style={{ marginBottom: '20px' }}>User Management ({users.length})</h2>
                {users.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                    No users registered yet
                  </p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                          <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                          <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                          <th style={{ padding: '15px', textAlign: 'left' }}>Phone</th>
                          <th style={{ padding: '15px', textAlign: 'left' }}>Role</th>
                          <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                            <td style={{ padding: '15px' }}>
                              {user.firstName} {user.lastName}
                            </td>
                            <td style={{ padding: '15px' }}>{user.email}</td>
                            <td style={{ padding: '15px' }}>{user.phone || 'N/A'}</td>
                            <td style={{ padding: '15px' }}>
                              <span style={{
                                padding: '5px 10px',
                                background: user.role === 'admin' ? '#6a11cb' : '#28a745',
                                color: 'white',
                                borderRadius: '5px',
                                fontSize: '12px'
                              }}>
                                {user.role || 'user'}
                              </span>
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <button
                                onClick={() => deleteUser(user.email)}
                                style={{
                                  padding: '8px 15px',
                                  background: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Artworks Tab */}
            {activeTab === 'artworks' && (
              <div>
                <h2 style={{ marginBottom: '20px' }}>Artwork Management ({artworks.length})</h2>
                {artworks.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                    No custom artworks uploaded yet
                  </p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {artworks.map((artwork) => (
                      <div key={artwork.id} style={{
                        background: 'white',
                        border: '1px solid #dee2e6',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        <img
                          src={artwork.image}
                          alt={artwork.name}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '15px' }}>
                          <h4 style={{ marginBottom: '5px', fontSize: '16px' }}>{artwork.name}</h4>
                          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                            By {artwork.artist}
                          </p>
                          <p style={{ fontWeight: 'bold', color: '#6a11cb', marginBottom: '15px' }}>
                            ₹{artwork.price?.toLocaleString()}
                          </p>
                          <button
                            onClick={() => deleteArtwork(artwork.id)}
                            style={{
                              width: '100%',
                              padding: '10px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >
                            🗑️ Delete Artwork
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ marginBottom: '20px' }}>Order Management ({orders.length})</h2>
                {orders.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                    No orders placed yet
                  </p>
                ) : (
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {orders.map((order, index) => (
                      <div key={index} style={{
                        background: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid #dee2e6'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                          <div>
                            <h4 style={{ marginBottom: '5px' }}>Order #{order.orderId}</h4>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6a11cb' }}>
                              ₹{order.total?.toLocaleString()}
                            </div>
                            <span style={{
                              padding: '5px 10px',
                              background: '#28a745',
                              color: 'white',
                              borderRadius: '5px',
                              fontSize: '12px'
                            }}>
                              {order.status || 'Confirmed'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <strong>Items:</strong> {order.items?.length || 0} item(s)
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
