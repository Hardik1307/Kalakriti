import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('kalakriti_currentUser')
    
    if (!currentUser) {
      alert('Please login to proceed with checkout')
      navigate('/login')
      return
    }

    // Navigate to payment page
    navigate('/payment')
  }

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: '40px', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h2>Your Cart is Empty</h2>
            <p style={{ marginBottom: '30px' }}>Start exploring our beautiful collection of Indian paintings.</p>
            <Link to="/gallery" className="btn btn-primary">Browse Gallery</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h2>Shopping Cart</h2>
          <button 
            onClick={clearCart}
            className="btn btn-outline"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '40px' }}>
          {/* Cart Items */}
          <div>
            {items.map((item) => (
              <div 
                key={item.id} 
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '8px' }}>{item.name}</h3>
                  <p style={{ color: '#666', marginBottom: '12px' }}>By {item.artist}</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#6a11cb', marginBottom: '15px' }}>
                    ₹{item.price.toLocaleString()}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #ddd',
                          background: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #ddd',
                          background: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <Link
                      to={`/artwork/${item.id}`}
                      className="btn btn-outline"
                      style={{
                        fontSize: '12px',
                        padding: '6px 12px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      👁️ View Details
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        color: '#e74c3c',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontSize: '12px'
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div>
            <div 
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: '100px'
              }}
            >
              <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
              <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Subtotal:</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Tax:</span>
                  <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '25px' }}>
                <span>Total:</span>
                <span>₹{Math.round(getCartTotal() * 1.18).toLocaleString()}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '15px' }}
              >
                Proceed to Checkout
              </button>
              <Link 
                to="/gallery" 
                className="btn btn-outline"
                style={{ width: '100%', textAlign: 'center', display: 'block' }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart