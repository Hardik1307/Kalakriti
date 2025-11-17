import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useNotification } from '../hooks/useNotification'
import Notification from '../components/Notification'

const UserProfile = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { notification, showNotification, hideNotification } = useNotification()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    bio: '',
    interests: []
  })
  const [orderHistory, setOrderHistory] = useState([])
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  // Mock wishlist
  const [wishlist] = useState([
    {
      id: '4',
      name: 'Gond Celebration',
      artist: 'Pooja Sharma',
      price: 38000,
      image: '/images/new images/painting 4.jpg'
    },
    {
      id: '6',
      name: 'Prakriti Aangan',
      artist: 'Rajesh Kumar',
      price: 31500,
      image: '/images/new images/painting 6.jpg'
    }
  ])

  useEffect(() => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || 'null')
    if (!currentUser) {
      navigate('/login')
      return
    }

    setUser(currentUser)
    setProfileData({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      city: currentUser.city || '',
      state: currentUser.state || '',
      pincode: currentUser.pincode || '',
      bio: currentUser.bio || '',
      interests: currentUser.interests || []
    })

    // Load user's orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
    const userOrders = allOrders.filter(order => order.userEmail === currentUser.email)
    setOrderHistory(userOrders)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSaveProfile = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, ...profileData }
    localStorage.setItem('kalakriti_currentUser', JSON.stringify(updatedUser))
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('kalakriti_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem('kalakriti_users', JSON.stringify(users))
    }

    setUser(updatedUser)
    setIsEditing(false)
    showNotification('Profile updated successfully!', 'success')
  }

  const handleLogout = () => {
    localStorage.removeItem('kalakriti_currentUser')
    clearCart()
    showNotification('Logged out successfully!', 'success')
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#28a745'
      case 'Shipped': return '#007bff'
      case 'Processing': return '#ffc107'
      default: return '#6c757d'
    }
  }

  const availableInterests = [
    'Madhubani Art', 'Rajput Miniatures', 'Kalamkari', 'Warli Art', 'Gond Art',
    'Pattachitra', 'Tanjore Paintings', 'Mysore Paintings', 'Contemporary Art',
    'Folk Art', 'Religious Art', 'Nature Themes', 'Portrait Art', 'Abstract Art'
  ]

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #6a11cb',
          borderRadius: '50%'
        }}></div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh', background: '#f8f9fa' }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      <div className="container">
        {/* Profile Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          marginBottom: '30px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                {user.firstName} {user.lastName}
              </h1>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '15px' }}>
                {user.email}
              </p>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '0', 
          marginBottom: '30px',
          background: 'white',
          borderRadius: '15px',
          padding: '5px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'orders', label: 'Orders', icon: '📦' },
            { id: 'transactions', label: 'Transactions', icon: '💳' },
            { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '15px 20px',
                border: 'none',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #6a11cb, #2575fc)' 
                  : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#333' }}>Personal Information</h3>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="btn btn-primary"
                  style={{ padding: '10px 20px' }}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+91 XXXXX XXXXX"
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Address
                </label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  placeholder="Enter your full address"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    background: isEditing ? 'white' : '#f8f9fa',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    PIN Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={profileData.pincode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="XXXXXX"
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="4"
                  placeholder="Tell us about yourself and your art interests..."
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    background: isEditing ? 'white' : '#f8f9fa',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', color: '#333' }}>
                  Art Interests
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => isEditing && handleInterestToggle(interest)}
                      disabled={!isEditing}
                      style={{
                        padding: '8px 16px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '20px',
                        background: profileData.interests.includes(interest) 
                          ? 'linear-gradient(135deg, #6a11cb, #2575fc)' 
                          : 'white',
                        color: profileData.interests.includes(interest) ? 'white' : '#666',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: isEditing ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        opacity: isEditing ? 1 : 0.7
                      }}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '30px' }}>Order History</h3>
              
              {orderHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📦</div>
                  <h4 style={{ marginBottom: '15px', color: '#666' }}>No Orders Yet</h4>
                  <p style={{ color: '#999', marginBottom: '25px' }}>
                    Start exploring our beautiful collection of Indian art!
                  </p>
                  <Link to="/gallery" className="btn btn-primary">
                    Browse Gallery
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orderHistory.map((order) => (
                    <div
                      key={order.orderId}
                      style={{
                        border: '2px solid #e1e5e9',
                        borderRadius: '15px',
                        padding: '25px',
                        background: '#f8f9fa'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                          <h4 style={{ marginBottom: '5px', color: '#333' }}>Order #{order.orderId}</h4>
                          <p style={{ color: '#666', fontSize: '14px' }}>
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            background: getStatusColor(order.status),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: '600',
                            marginBottom: '8px'
                          }}>
                            {order.status}
                          </div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                            ₹{order.totalAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {order.items.map((item, index) => (
                          <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '10px'
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <h5 style={{ marginBottom: '5px', color: '#333' }}>{item.name}</h5>
                              <p style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>
                                By {item.artist}
                              </p>
                              <p style={{ color: '#6a11cb', fontWeight: '600' }}>
                                ₹{(item.price * item.quantity).toLocaleString()} {item.quantity > 1 ? `(${item.quantity}x)` : ''}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '30px' }}>
                Transaction History & Receipts
              </h3>
              
              {orderHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💳</div>
                  <h4 style={{ marginBottom: '15px', color: '#666' }}>No Transactions Yet</h4>
                  <p style={{ color: '#999', marginBottom: '25px' }}>
                    Your payment history will appear here after your first purchase.
                  </p>
                  <Link to="/gallery" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                    {orderHistory.map((order) => (
                      <div
                        key={order.orderId}
                        style={{
                          border: '2px solid #e1e5e9',
                          borderRadius: '15px',
                          padding: '25px',
                          background: '#f8f9fa',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                              <h4 style={{ margin: 0, color: '#333' }}>Transaction #{order.orderId}</h4>
                              <div style={{
                                background: '#28a745',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                ✓ Completed
                              </div>
                            </div>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                              📅 {new Date(order.orderDate).toLocaleString()}
                            </p>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                              💳 Payment Method: {order.paymentMethod}
                            </p>
                            <p style={{ color: '#666', fontSize: '14px' }}>
                              📧 Receipt sent to: {order.userEmail}
                            </p>
                          </div>
                          
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6a11cb', marginBottom: '15px' }}>
                              ₹{order.totalAmount.toLocaleString()}
                            </div>
                            <button
                              onClick={() => setSelectedReceipt(order)}
                              className="btn btn-outline"
                              style={{ 
                                padding: '8px 16px', 
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              🧾 View Receipt
                            </button>
                          </div>
                        </div>
                        
                        <div style={{ 
                          borderTop: '1px solid #e1e5e9', 
                          paddingTop: '15px',
                          marginTop: '15px'
                        }}>
                          <h5 style={{ marginBottom: '15px', color: '#333', fontSize: '14px', fontWeight: '600' }}>
                            Items Purchased ({order.items.length})
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {order.items.map((item, index) => (
                              <div key={index} style={{ 
                                display: 'flex', 
                                gap: '12px', 
                                alignItems: 'center',
                                padding: '10px',
                                background: 'white',
                                borderRadius: '8px'
                              }}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                  }}
                                />
                                <div style={{ flex: 1 }}>
                                  <h6 style={{ margin: '0 0 4px 0', color: '#333', fontSize: '14px' }}>
                                    {item.name}
                                  </h6>
                                  <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <div style={{ fontWeight: '600', color: '#6a11cb' }}>
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ 
                          borderTop: '1px solid #e1e5e9', 
                          paddingTop: '15px',
                          marginTop: '15px'
                        }}>
                          <h5 style={{ marginBottom: '10px', color: '#333', fontSize: '14px', fontWeight: '600' }}>
                            Shipping Address
                          </h5>
                          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                            {order.shippingAddress.fullName}<br />
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                            📞 {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Receipt Modal */}
                  {selectedReceipt && (
                    <div style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1000,
                      padding: '20px'
                    }}
                    onClick={() => setSelectedReceipt(null)}>
                      <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '40px',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative'
                      }}
                      onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedReceipt(null)}
                          style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: '#f8f9fa',
                            border: 'none',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            fontSize: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>

                        {/* Receipt Header */}
                        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #6a11cb', paddingBottom: '20px' }}>
                          <h2 style={{ 
                            fontSize: '2rem', 
                            marginBottom: '10px',
                            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            🎨 Kalakriti
                          </h2>
                          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                            Indian Art Marketplace
                          </p>
                        </div>

                        {/* Receipt Details */}
                        <div style={{ marginBottom: '25px' }}>
                          <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#333' }}>
                            Payment Receipt
                          </h3>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                            <div>
                              <strong>Order ID:</strong> {selectedReceipt.orderId}
                            </div>
                            <div>
                              <strong>Date:</strong> {new Date(selectedReceipt.orderDate).toLocaleDateString()}
                            </div>
                            <div>
                              <strong>Payment Method:</strong> {selectedReceipt.paymentMethod}
                            </div>
                            <div>
                              <strong>Status:</strong> <span style={{ color: '#28a745', fontWeight: '600' }}>Paid</span>
                            </div>
                          </div>
                        </div>

                        {/* Items */}
                        <div style={{ marginBottom: '25px' }}>
                          <h4 style={{ marginBottom: '15px', color: '#333' }}>Items</h4>
                          <table style={{ width: '100%', fontSize: '14px' }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid #e1e5e9' }}>
                                <th style={{ textAlign: 'left', padding: '10px 0', color: '#666' }}>Item</th>
                                <th style={{ textAlign: 'center', padding: '10px 0', color: '#666' }}>Qty</th>
                                <th style={{ textAlign: 'right', padding: '10px 0', color: '#666' }}>Price</th>
                                <th style={{ textAlign: 'right', padding: '10px 0', color: '#666' }}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedReceipt.items.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                  <td style={{ padding: '12px 0' }}>{item.name}</td>
                                  <td style={{ textAlign: 'center', padding: '12px 0' }}>{item.quantity}</td>
                                  <td style={{ textAlign: 'right', padding: '12px 0' }}>₹{item.price.toLocaleString()}</td>
                                  <td style={{ textAlign: 'right', padding: '12px 0', fontWeight: '600' }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Total */}
                        <div style={{ 
                          borderTop: '2px solid #e1e5e9', 
                          paddingTop: '15px',
                          marginBottom: '25px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                            <span>Total Amount Paid:</span>
                            <span style={{ color: '#6a11cb' }}>₹{selectedReceipt.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div style={{ 
                          background: '#f8f9fa', 
                          padding: '15px', 
                          borderRadius: '10px',
                          marginBottom: '20px'
                        }}>
                          <h4 style={{ marginBottom: '10px', color: '#333', fontSize: '14px' }}>Shipping Address</h4>
                          <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                            {selectedReceipt.shippingAddress.fullName}<br />
                            {selectedReceipt.shippingAddress.address}<br />
                            {selectedReceipt.shippingAddress.city}, {selectedReceipt.shippingAddress.state} - {selectedReceipt.shippingAddress.pincode}<br />
                            📞 {selectedReceipt.shippingAddress.phone}
                          </p>
                        </div>

                        {/* Footer */}
                        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e1e5e9' }}>
                          <p style={{ color: '#999', fontSize: '12px', marginBottom: '15px' }}>
                            Thank you for your purchase! For any queries, contact us at support@kalakriti.com
                          </p>
                          <button
                            onClick={() => window.print()}
                            className="btn btn-primary"
                            style={{ padding: '10px 25px', fontSize: '14px' }}
                          >
                            🖨️ Print Receipt
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '30px' }}>My Wishlist</h3>
              
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❤️</div>
                  <h4 style={{ marginBottom: '15px', color: '#666' }}>Your Wishlist is Empty</h4>
                  <p style={{ color: '#999', marginBottom: '25px' }}>
                    Save your favorite artworks to view them later!
                  </p>
                  <Link to="/gallery" className="btn btn-primary">
                    Discover Art
                  </Link>
                </div>
              ) : (
                <div className="artwork-grid">
                  {wishlist.map((artwork) => (
                    <div key={artwork.id} className="artwork-card">
                      <img src={artwork.image} alt={artwork.name} />
                      <div className="artwork-info">
                        <h3>{artwork.name}</h3>
                        <p className="artist">By {artwork.artist}</p>
                        <div className="artwork-meta">
                          <span className="price">₹{artwork.price.toLocaleString()}</span>
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
                            className="btn btn-primary"
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
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '30px' }}>Account Settings</h3>
              
              <div style={{ display: 'grid', gap: '25px' }}>
                <div style={{
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  padding: '25px',
                  background: '#f8f9fa'
                }}>
                  <h4 style={{ marginBottom: '15px', color: '#333' }}>Notifications</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#6a11cb' }} />
                      <span>Email notifications for new artworks</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#6a11cb' }} />
                      <span>SMS notifications for order updates</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#6a11cb' }} />
                      <span>Marketing emails and promotions</span>
                    </label>
                  </div>
                </div>

                <div style={{
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  padding: '25px',
                  background: '#f8f9fa'
                }}>
                  <h4 style={{ marginBottom: '15px', color: '#333' }}>Privacy</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#6a11cb' }} />
                      <span>Make my profile visible to artists</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#6a11cb' }} />
                      <span>Show my purchase history publicly</span>
                    </label>
                  </div>
                </div>

                <div style={{
                  border: '2px solid #dc3545',
                  borderRadius: '15px',
                  padding: '25px',
                  background: '#fff5f5'
                }}>
                  <h4 style={{ marginBottom: '15px', color: '#dc3545' }}>Danger Zone</h4>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        showNotification('Account deletion requested. Please contact support.', 'info')
                      }
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile