import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Payment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, getCartTotal, clearCart } = useCart()
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  })
  const [processing, setProcessing] = useState(false)

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || '{}')
  
  if (!currentUser.email) {
    navigate('/login')
    return null
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const subtotal = getCartTotal()
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = (e) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const orderDetails = {
        orderId: 'ORD' + Date.now(),
        userEmail: currentUser.email,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          artist: item.artist || 'Unknown Artist',
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image
        })),
        subtotal: subtotal,
        tax: tax,
        totalAmount: total,
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : 
                       paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
        shippingAddress: {
          fullName: `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || currentUser.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone
        },
        orderDate: new Date().toISOString(),
        status: 'Confirmed'
      }

      // Save order
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      existingOrders.push(orderDetails)
      localStorage.setItem('userOrders', JSON.stringify(existingOrders))

      // Clear cart
      clearCart()

      // Show success and redirect
      alert(`✅ Payment Successful!\n\nOrder ID: ${orderDetails.orderId}\nTotal Paid: ₹${total.toLocaleString()}\n\nThank you for your purchase!`)
      navigate('/profile')
    }, 2000)
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <button 
          onClick={() => navigate('/cart')}
          className="btn btn-outline"
          style={{ marginBottom: '30px' }}
        >
          ← Back to Cart
        </button>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#333' }}>
          Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
          {/* Payment Form */}
          <div>
            <form onSubmit={handlePayment}>
              {/* Shipping Address */}
              <div style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '15px', 
                marginBottom: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
                  📍 Shipping Address
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{6}"
                      placeholder="6 digits"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      placeholder="10 digits"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
                  💳 Payment Method
                </h2>

                {/* Payment Options */}
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '15px',
                    border: `2px solid ${paymentMethod === 'card' ? '#6a11cb' : '#e1e5e9'}`,
                    borderRadius: '8px',
                    marginBottom: '15px',
                    cursor: 'pointer',
                    background: paymentMethod === 'card' ? '#f0e6ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontWeight: '600' }}>💳 Credit/Debit Card</span>
                  </label>

                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '15px',
                    border: `2px solid ${paymentMethod === 'upi' ? '#6a11cb' : '#e1e5e9'}`,
                    borderRadius: '8px',
                    marginBottom: '15px',
                    cursor: 'pointer',
                    background: paymentMethod === 'upi' ? '#f0e6ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontWeight: '600' }}>📱 UPI</span>
                  </label>

                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '15px',
                    border: `2px solid ${paymentMethod === 'cod' ? '#6a11cb' : '#e1e5e9'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: paymentMethod === 'cod' ? '#f0e6ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontWeight: '600' }}>💵 Cash on Delivery</span>
                  </label>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required={paymentMethod === 'card'}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required={paymentMethod === 'card'}
                        placeholder="Name on card"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required={paymentMethod === 'card'}
                          placeholder="MM/YY"
                          maxLength="5"
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e1e5e9',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required={paymentMethod === 'card'}
                          placeholder="123"
                          maxLength="3"
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e1e5e9',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      UPI ID *
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      required={paymentMethod === 'upi'}
                      placeholder="yourname@upi"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                )}

                {/* COD Message */}
                {paymentMethod === 'cod' && (
                  <div style={{
                    padding: '15px',
                    background: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '8px',
                    color: '#856404'
                  }}>
                    💵 Pay cash when your order is delivered. Please keep exact change ready.
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  marginTop: '30px',
                  padding: '18px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  opacity: processing ? 0.6 : 1,
                  cursor: processing ? 'not-allowed' : 'pointer'
                }}
              >
                {processing ? '⏳ Processing Payment...' : `💳 Pay ₹${total.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
                📦 Order Summary
              </h2>

              {/* Items */}
              <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '15px',
                    paddingBottom: '15px',
                    borderBottom: '1px solid #eee'
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
                      <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>{item.name}</h4>
                      <p style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</p>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6a11cb' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ borderTop: '2px solid #eee', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span>Shipping:</span>
                  <span style={{ color: '#28a745', fontWeight: '600' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span>Tax (18%):</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  paddingTop: '20px',
                  borderTop: '2px solid #333'
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#6a11cb' }}>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div style={{
                marginTop: '25px',
                padding: '15px',
                background: '#e8f5e8',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#28a745', margin: 0 }}>
                  🔒 Secure Payment • 100% Safe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
