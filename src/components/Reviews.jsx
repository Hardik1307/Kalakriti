import { useState, useEffect } from 'react'

const Reviews = ({ itemId, itemType = 'artwork' }) => {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [itemId])

  const loadReviews = () => {
    const storageKey = `reviews_${itemType}_${itemId}`
    const storedReviews = JSON.parse(localStorage.getItem(storageKey) || '[]')
    setReviews(storedReviews)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || '{}')
    if (!currentUser.email) {
      alert('Please login to leave a review')
      return
    }

    if (!newReview.comment.trim()) {
      alert('Please write a comment')
      return
    }

    const review = {
      id: Date.now(),
      userId: currentUser.email,
      userName: currentUser.firstName || currentUser.name || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0
    }

    const storageKey = `reviews_${itemType}_${itemId}`
    const updatedReviews = [review, ...reviews]
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews))
    setReviews(updatedReviews)
    setNewReview({ rating: 5, comment: '' })
    setShowForm(false)
    alert('✅ Review submitted successfully!')
  }

  const markHelpful = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    )
    const storageKey = `reviews_${itemType}_${itemId}`
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews))
    setReviews(updatedReviews)
  }

  const deleteReview = (reviewId) => {
    const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || '{}')
    const review = reviews.find(r => r.id === reviewId)
    
    if (review.userId !== currentUser.email && currentUser.userType !== 'admin') {
      alert('You can only delete your own reviews')
      return
    }

    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(r => r.id !== reviewId)
      const storageKey = `reviews_${itemType}_${itemId}`
      localStorage.setItem(storageKey, JSON.stringify(updatedReviews))
      setReviews(updatedReviews)
      alert('Review deleted')
    }
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  const StarRating = ({ rating, size = 20, interactive = false, onChange }) => {
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => interactive && onChange && onChange(star)}
            style={{
              fontSize: `${size}px`,
              color: star <= rating ? '#ffc107' : '#ddd',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'all 0.2s ease'
            }}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div style={{
      background: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      marginTop: '40px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
            ⭐ Reviews & Ratings
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#6a11cb' }}>
                {averageRating}
              </span>
              <div>
                <StarRating rating={Math.round(averageRating)} size={24} />
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
          style={{ padding: '12px 25px' }}
        >
          {showForm ? '✖ Cancel' : '✍️ Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Write Your Review</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              Your Rating *
            </label>
            <StarRating 
              rating={newReview.rating} 
              size={30} 
              interactive={true}
              onChange={(rating) => setNewReview({ ...newReview, rating })}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              Your Review *
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              rows="5"
              placeholder="Share your thoughts about this artwork..."
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '12px 30px' }}
          >
            📝 Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div>
        {reviews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💬</div>
            <h3 style={{ marginBottom: '10px' }}>No reviews yet</h3>
            <p>Be the first to review this {itemType}!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {reviews.map((review) => {
              const currentUser = JSON.parse(localStorage.getItem('kalakriti_currentUser') || '{}')
              const isOwner = review.userId === currentUser.email
              const isAdmin = currentUser.userType === 'admin'

              return (
                <div
                  key={review.id}
                  style={{
                    padding: '25px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    border: '1px solid #e1e5e9'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}>
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {review.userName}
                            {isOwner && (
                              <span style={{
                                marginLeft: '10px',
                                fontSize: '12px',
                                color: '#6a11cb',
                                fontWeight: 'normal'
                              }}>
                                (You)
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={18} />
                    </div>
                    {(isOwner || isAdmin) && (
                      <button
                        onClick={() => deleteReview(review.id)}
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
                    )}
                  </div>

                  <p style={{ 
                    lineHeight: '1.6', 
                    color: '#333',
                    marginBottom: '15px',
                    fontSize: '15px'
                  }}>
                    {review.comment}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    paddingTop: '15px',
                    borderTop: '1px solid #dee2e6'
                  }}>
                    <button
                      onClick={() => markHelpful(review.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reviews
