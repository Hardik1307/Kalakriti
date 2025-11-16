import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AuctionRoom = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // State management
  const [bidAmount, setBidAmount] = useState('')
  const [currentBid, setCurrentBid] = useState(33750)
  const [totalBidders, setTotalBidders] = useState(12)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 })
  const [bidHistory, setBidHistory] = useState([
    { bidder: 'ArtLover123', amount: 33750, time: '2 minutes ago' },
    { bidder: 'Collector_Pro', amount: 33250, time: '5 minutes ago' },
    { bidder: 'IndianArt_Fan', amount: 32750, time: '8 minutes ago' }
  ])

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || '{}')
  const userName = currentUser.name || currentUser.firstName || 'Guest User'
  
  // Calculate minimum bid (current bid + 500)
  const minBid = currentBid + 500

  // Auction data
  const auction = {
    id: id,
    name: 'Madhubani Raga',
    artist: 'Pooja Sharma',
    image: '/images/new images/painting 1.webp',
    description: 'A beautiful Madhubani painting showcasing traditional Indian folk art with intricate patterns and vibrant colors.',
    dimensions: '24" x 36"',
    medium: 'Acrylic on Canvas',
    year: '2024'
  }

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          clearInterval(timer)
          return { hours: 0, minutes: 0, seconds: 0 }
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Show message
  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  // Handle bid submission
  const handleBidSubmit = (e) => {
    e.preventDefault()
    
    // Check if auction ended
    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      showMessage('This auction has ended', 'error')
      return
    }
    
    // Validate bid amount
    if (!bidAmount || bidAmount === '') {
      showMessage('Please enter a bid amount', 'error')
      return
    }
    
    const bidValue = parseInt(bidAmount)
    
    if (isNaN(bidValue)) {
      showMessage('Please enter a valid number', 'error')
      return
    }
    
    if (bidValue < minBid) {
      showMessage(`Your bid must be at least ₹${minBid.toLocaleString()}`, 'error')
      return
    }
    

    
    // Place bid
    const newBid = {
      bidder: userName,
      amount: bidValue,
      time: 'Just now',
      isCurrentUser: true
    }
    
    setBidHistory([newBid, ...bidHistory])
    setCurrentBid(bidValue)
    setTotalBidders(totalBidders + 1)
    setBidAmount('')
    
    showMessage('🎉 Your bid has been placed successfully!', 'success')
  }

  const isAuctionEnded = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div style={{ 
      paddingTop: '40px', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      {/* Notification */}
      {message.text && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          padding: '15px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          border: `2px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          minWidth: '300px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {message.text}
        </div>
      )}
      
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Back Button */}
        <button 
          onClick={() => navigate('/auctions')}
          className="btn btn-outline"
          style={{ 
            marginBottom: '30px',
            padding: '12px 20px'
          }}
        >
          ← Back to Auctions
        </button>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.5fr 1fr', 
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Main Auction Area */}
          <div>
            {/* Artwork Display */}
            <div style={{ 
              background: 'white', 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={auction.image} 
                  alt={auction.name}
                  style={{ 
                    width: '100%', 
                    height: '500px', 
                    objectFit: 'cover'
                  }}
                />
                {isAuctionEnded && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(220, 53, 69, 0.95)',
                    color: 'white',
                    padding: '20px 40px',
                    borderRadius: '15px',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}>
                    AUCTION ENDED
                  </div>
                )}
              </div>
              
              <div style={{ padding: '40px' }}>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '15px', 
                  color: '#333'
                }}>
                  {auction.name}
                </h1>
                <p style={{ 
                  fontSize: '1.3rem', 
                  color: '#6a11cb', 
                  marginBottom: '30px'
                }}>
                  By {auction.artist}
                </p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '20px',
                  marginBottom: '30px',
                  padding: '25px',
                  background: '#f8f9fa',
                  borderRadius: '15px'
                }}>
                  <div>
                    <strong style={{ color: '#6a11cb', display: 'block', marginBottom: '5px' }}>
                      📏 Dimensions
                    </strong>
                    {auction.dimensions}
                  </div>
                  <div>
                    <strong style={{ color: '#6a11cb', display: 'block', marginBottom: '5px' }}>
                      🎨 Medium
                    </strong>
                    {auction.medium}
                  </div>
                  <div>
                    <strong style={{ color: '#6a11cb', display: 'block', marginBottom: '5px' }}>
                      📅 Year
                    </strong>
                    {auction.year}
                  </div>
                  <div>
                    <strong style={{ color: '#6a11cb', display: 'block', marginBottom: '5px' }}>
                      👥 Bidders
                    </strong>
                    {totalBidders}
                  </div>
                </div>
                
                <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.05rem' }}>
                  {auction.description}
                </p>
              </div>
            </div>

            {/* Bid History */}
            <div style={{ 
              background: 'white', 
              padding: '35px', 
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                marginBottom: '25px', 
                color: '#333',
                fontSize: '1.8rem'
              }}>
                📊 Bid History ({bidHistory.length} bids)
              </h3>
              <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto'
              }}>
                {bidHistory.map((bid, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      marginBottom: '12px',
                      background: bid.isCurrentUser ? '#d4edda' : '#f8f9fa',
                      borderRadius: '12px',
                      border: bid.isCurrentUser ? '2px solid #28a745' : '2px solid #e1e5e9'
                    }}
                  >
                    <div>
                      <div style={{ 
                        fontWeight: '700', 
                        color: '#333',
                        fontSize: '1.1rem',
                        marginBottom: '5px'
                      }}>
                        {bid.isCurrentUser ? '🎯 ' : ''}
                        {bid.bidder}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        ⏰ {bid.time}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '1.4rem', 
                      fontWeight: 'bold', 
                      color: bid.isCurrentUser ? '#28a745' : '#6a11cb'
                    }}>
                      ₹{bid.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bidding Panel */}
          <div>
            <div style={{ 
              background: 'white', 
              padding: '35px', 
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ 
                marginBottom: '25px', 
                color: '#333',
                fontSize: '1.8rem'
              }}>
                🔨 Live Auction
              </h3>
              
              {/* Timer */}
              <div style={{ 
                background: isAuctionEnded 
                  ? 'linear-gradient(135deg, #dc3545, #c82333)' 
                  : 'linear-gradient(135deg, #ff6b6b, #ee5a24)', 
                color: 'white',
                padding: '25px', 
                borderRadius: '15px', 
                textAlign: 'center',
                marginBottom: '25px',
                boxShadow: '0 10px 30px rgba(238, 90, 36, 0.3)'
              }}>
                <div style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '500' }}>
                  {isAuctionEnded ? '⏰ Auction Has Ended' : '⏰ Time Remaining'}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                  {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </div>
              </div>

              {/* Current Bid */}
              <div style={{ 
                background: '#f8f9fa', 
                padding: '25px', 
                borderRadius: '15px',
                marginBottom: '25px',
                border: '2px solid #e1e5e9'
              }}>
                <div style={{ fontSize: '0.95rem', color: '#666', marginBottom: '8px', fontWeight: '500' }}>
                  💰 Current Highest Bid
                </div>
                <div style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: 'bold', 
                  color: '#6a11cb',
                  marginBottom: '10px'
                }}>
                  ₹{currentBid.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  color: '#666',
                  padding: '8px 12px',
                  background: 'rgba(106, 17, 203, 0.1)',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  Minimum bid: ₹{minBid.toLocaleString()} (₹500 more)
                </div>
              </div>

              {/* Bid Form */}
              <form onSubmit={handleBidSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#333',
                    fontSize: '1.05rem'
                  }}>
                    💵 Your Bid Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Minimum ₹${minBid.toLocaleString()}`}
                    min={minBid}
                    step="1"
                    disabled={isAuctionEnded}
                    style={{
                      width: '100%',
                      padding: '18px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      opacity: isAuctionEnded ? 0.6 : 1
                    }}
                  />
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#666', 
                    marginTop: '8px',
                    fontStyle: 'italic'
                  }}>
                    💡 Bid must be at least ₹500 more than current bid
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    padding: '18px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: isAuctionEnded ? 'not-allowed' : 'pointer',
                    opacity: isAuctionEnded ? 0.6 : 1
                  }}
                  disabled={isAuctionEnded}
                >
                  {isAuctionEnded ? '🔒 Auction Ended' : '🔨 Place Bid'}
                </button>
              </form>

              {/* Quick Bid Buttons */}
              {!isAuctionEnded && (
                <div style={{ marginTop: '25px' }}>
                  <div style={{ 
                    fontSize: '0.95rem', 
                    color: '#666', 
                    marginBottom: '12px',
                    fontWeight: '600'
                  }}>
                    ⚡ Quick Bid:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setBidAmount(minBid.toString())}
                      className="btn btn-outline"
                      style={{ fontSize: '0.9rem', padding: '12px', fontWeight: '600' }}
                    >
                      +₹500
                    </button>
                    <button
                      type="button"
                      onClick={() => setBidAmount((minBid + 1000).toString())}
                      className="btn btn-outline"
                      style={{ fontSize: '0.9rem', padding: '12px', fontWeight: '600' }}
                    >
                      +₹1,500
                    </button>
                    <button
                      type="button"
                      onClick={() => setBidAmount((minBid + 2000).toString())}
                      className="btn btn-outline"
                      style={{ fontSize: '0.9rem', padding: '12px', fontWeight: '600' }}
                    >
                      +₹2,500
                    </button>
                    <button
                      type="button"
                      onClick={() => setBidAmount((minBid + 4500).toString())}
                      className="btn btn-outline"
                      style={{ fontSize: '0.9rem', padding: '12px', fontWeight: '600' }}
                    >
                      +₹5,000
                    </button>
                  </div>
                </div>
              )}

              {/* Auction Info */}
              <div style={{ 
                marginTop: '25px', 
                padding: '20px',
                background: '#fff3cd',
                borderRadius: '12px',
                border: '2px solid #ffeaa7'
              }}>
                <h4 style={{ 
                  marginBottom: '15px', 
                  fontSize: '1.1rem',
                  color: '#856404'
                }}>
                  📋 Auction Rules
                </h4>
                <ul style={{ 
                  fontSize: '0.9rem', 
                  color: '#856404',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  <li>Minimum bid: ₹500 above current bid</li>
                  <li>All bids are final and binding</li>
                  <li>Payment due within 24 hours</li>
                  <li>Shipping available worldwide</li>
                  <li>Certificate of authenticity included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionRoom