import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddPainting = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    price: '',
    category: 'Traditional',
    description: '',
    dimensions: '',
    medium: '',
    year: new Date().getFullYear()
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: 'Image size should be less than 5MB', type: 'error' })
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage({ text: 'Please select a valid image file', type: 'error' })
        return
      }

      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.artist || !formData.price) {
      setMessage({ text: 'Please fill in all required fields', type: 'error' })
      return
    }

    if (!imagePreview) {
      setMessage({ text: 'Please upload an image', type: 'error' })
      return
    }

    // Get existing paintings from localStorage
    const existingPaintings = JSON.parse(localStorage.getItem('customPaintings') || '[]')

    // Create new painting object with base64 image
    const newPainting = {
      id: Date.now(),
      ...formData,
      price: parseInt(formData.price),
      image: imagePreview, // Store base64 image
      addedDate: new Date().toISOString()
    }

    // Add to localStorage
    existingPaintings.push(newPainting)
    localStorage.setItem('customPaintings', JSON.stringify(existingPaintings))

    setMessage({ text: '✅ Painting added successfully!', type: 'success' })

    // Reset form
    setTimeout(() => {
      navigate('/gallery')
    }, 1500)
  }

  return (
    <div style={{
      paddingTop: '40px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button
          onClick={() => navigate('/gallery')}
          className="btn btn-outline"
          style={{ marginBottom: '30px' }}
        >
          ← Back to Gallery
        </button>

        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '10px',
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Add New Painting
          </h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Share your artwork with the Kalakriti community
          </p>

          {message.text && (
            <div style={{
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              background: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Painting Image *
              </label>
              <div style={{
                border: '2px dashed #e1e5e9',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                background: '#f8f9fa',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.currentTarget.style.borderColor = '#6a11cb'
                  e.currentTarget.style.background = '#f0e6ff'
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e1e5e9'
                  e.currentTarget.style.background = '#f8f9fa'
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.currentTarget.style.borderColor = '#e1e5e9'
                  e.currentTarget.style.background = '#f8f9fa'
                  const file = e.dataTransfer.files[0]
                  if (file) {
                    const fakeEvent = { target: { files: [file] } }
                    handleImageChange(fakeEvent)
                  }
                }}
                onClick={() => document.getElementById('imageInput').click()}>
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        borderRadius: '10px',
                        marginBottom: '15px'
                      }}
                    />
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      ✅ Image uploaded • Click to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ color: '#666', marginBottom: '5px', fontWeight: '600' }}>
                      Click to upload or drag and drop
                    </p>
                    <p style={{ color: '#999', fontSize: '0.85rem' }}>
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                )}
              </div>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Painting Name *
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
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Artist Name *
              </label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="Traditional">Traditional</option>
                  <option value="Modern">Modern</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Portrait">Portrait</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder='e.g., 24" x 36"'
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Medium
                </label>
                <input
                  type="text"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  placeholder="e.g., Oil on Canvas"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your artwork..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}
            >
              🎨 Add Painting
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPainting
