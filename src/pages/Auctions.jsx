import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auctions = () => {
  const [timeLeft, setTimeLeft] = useState({})
  const navigate = useNavigate()

  const auctions = [
    {
      id: 1,
      name: 'Madhubani Raga',
      artist: 'Pooja Sharma',
      currentBid: 33750,
      image: '/images/new images/painting 1.webp',
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      bidders: 12
    },
    {
      id: 2,
      name: 'Chitrakala',
      artist: 'Rajesh Kumar',
      currentBid: 51000,
      image: '/images/new images/painting 2.jpg',
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      bidders: 8
    },
    {
      id: 3,
      name: 'Abstrakt Bharat',
      artist: 'Ravi Kumar',
      currentBid: 27300,
      image: '/images/new images/painting 6.jpg',
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      bidders: 15
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {}
      auctions.forEach(auction => {
        const difference = auction.endTime - new Date()
        if (difference > 0) {
          newTimeLeft[auction.id] = {
            hours: Math.floor(difference / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          }
        }
      })
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleJoinAuction = (auctionId) => {
    navigate(`/auction-room/${auctionId}`)
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h2>Live Auctions</h2>
          <p>Bid on exclusive Indian paintings from talented artists</p>
        </div>

        <div className="artwork-grid">
          {auctions.map((auction) => (
            <div key={auction.id} className="artwork-card">
              <img src={auction.image} alt={auction.name} />
              <div className="artwork-info">
                <h3>{auction.name}</h3>
                <p className="artist">By {auction.artist}</p>
                
                <div style={{ margin: '15px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Current Bid:</span>
                    <span style={{ fontWeight: 'bold', color: '#6a11cb' }}>
                      ₹{auction.currentBid.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Bidders:</span>
                    <span>{auction.bidders}</span>
                  </div>
                </div>

                {timeLeft[auction.id] && (
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    marginBottom: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                      Time Remaining:
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e74c3c' }}>
                      {timeLeft[auction.id].hours}h {timeLeft[auction.id].minutes}m {timeLeft[auction.id].seconds}s
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-outline"
                    onClick={() => navigate(`/artwork/${auction.id}`)}
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontSize: '14px'
                    }}
                  >
                    👁️ View Details
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleJoinAuction(auction.id)}
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontSize: '14px'
                    }}
                  >
                    🔨 Join Auction
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '10px', 
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <h3>How Auctions Work</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '30px' }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
              <h4>Place Your Bid</h4>
              <p>Enter your maximum bid amount for the artwork you want.</p>
            </div>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏰</div>
              <h4>Watch the Timer</h4>
              <p>Keep track of the auction end time and bid accordingly.</p>
            </div>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🏆</div>
              <h4>Win the Artwork</h4>
              <p>If you have the highest bid when time runs out, you win!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auctions