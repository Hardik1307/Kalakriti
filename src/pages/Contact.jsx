import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Get in touch with our team</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '40px', borderRadius: '10px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div style={{ background: 'white', padding: '40px', borderRadius: '10px', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '30px' }}>Get in Touch</h3>
              
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '10px', color: '#6a11cb' }}>📧 Email</h4>
                <p>info@kalakriti.com</p>
                <p>support@kalakriti.com</p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '10px', color: '#6a11cb' }}>📞 Phone</h4>
                <p>+91 98765 43210</p>
                <p>+91 87654 32109</p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '10px', color: '#6a11cb' }}>📍 Address</h4>
                <p>123 Art Street<br />Cultural District<br />New Delhi, India 110001</p>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px', color: '#6a11cb' }}>🕒 Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div style={{ background: 'white', padding: '40px', borderRadius: '10px' }}>
              <h3 style={{ marginBottom: '20px' }}>Frequently Asked Questions</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>How do I track my order?</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  You'll receive a tracking number via email once your order ships.
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>What is your return policy?</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  We offer a 30-day return policy for all artworks in original condition.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Do you ship internationally?</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Yes, we ship worldwide with secure packaging and insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact