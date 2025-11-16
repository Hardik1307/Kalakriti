# Kalakriti - Indian Art Marketplace

A modern, full-featured React-based web application for discovering, bidding on, and purchasing authentic Indian paintings.

## 🎨 Features

### Core Functionality
- **Art Gallery** - Browse extensive collection of Indian paintings with advanced search and filtering
- **Live Auctions** - Real-time bidding system with countdown timers and bid history
- **Artist Profiles** - Detailed artist portfolios with social media integration
- **Shopping Cart** - Full e-commerce functionality with cart management
- **User Authentication** - Secure login/signup with session management
- **User Dashboard** - Profile management, order history, and wishlist

### Advanced Features
- **Image Upload** - Artists can upload their own paintings with drag-and-drop support
- **Responsive Design** - Mobile-first design that works on all devices
- **Search & Filter** - Advanced search with suggestions and category filtering
- **Artwork Details** - Multi-image galleries with detailed specifications
- **Add Painting** - Artists can contribute new artworks to the platform

## 🚀 Technologies Used

- **React 18** - Modern React with Hooks
- **React Router** - Client-side routing
- **Context API** - State management for cart and notifications
- **LocalStorage** - Data persistence
- **CSS3** - Custom styling with gradients and animations
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
kalakriti-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Site footer
│   │   └── Notification.jsx    # Toast notifications
│   ├── context/
│   │   └── CartContext.jsx     # Shopping cart state
│   ├── hooks/
│   │   └── useNotification.js  # Notification hook
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with slider
│   │   ├── Gallery.jsx         # Art gallery with filters
│   │   ├── Artists.jsx         # Artist directory
│   │   ├── Auctions.jsx        # Live auctions listing
│   │   ├── AuctionRoom.jsx     # Individual auction page
│   │   ├── ArtworkDetail.jsx   # Artwork details page
│   │   ├── ArtistProfile.jsx   # Artist profile page
│   │   ├── AddPainting.jsx     # Upload new artwork
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Login.jsx           # User login
│   │   ├── Signup.jsx          # User registration
│   │   ├── UserProfile.jsx     # User dashboard
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact form
│   │   └── NotFound.jsx        # 404 page
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── main.jsx                # Entry point
├── public/
│   └── images/                 # Image assets
└── package.json
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kalakriti-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 💡 Key Features Explained

### 1. Live Auction System
- Real-time countdown timers
- Minimum bid validation (₹500 above current bid)
- Bid history tracking with user identification
- Auction status indicators

### 2. Image Upload System
- Drag-and-drop file upload
- Image preview before submission
- File size validation (max 5MB)
- Base64 encoding for localStorage storage
- Support for PNG, JPG, WEBP formats

### 3. Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart data
- Cart count in header

### 4. User Authentication
- Secure login/signup forms
- Password strength validation
- Session management with localStorage
- Protected routes
- User profile management

### 5. Search & Filter
- Real-time search suggestions
- Category-based filtering
- Search across artwork names, artists, and categories
- Popular search terms display

## 🎯 User Flows

### Buyer Journey
1. Browse gallery or view live auctions
2. Search/filter artworks by category
3. View detailed artwork information
4. Add to cart or place bid in auction
5. Complete purchase through cart
6. Track orders in user profile

### Artist Journey
1. Sign up as an artist
2. Navigate to Gallery page
3. Click "Add Your Painting"
4. Upload artwork image
5. Fill in painting details
6. Submit to gallery
7. Artwork appears immediately in gallery

### Auction Participation
1. Browse live auctions
2. Click "Join Auction"
3. View artwork details and bid history
4. Place bid (minimum ₹500 above current)
5. Monitor auction timer
6. Win artwork when auction ends

## 🔐 Data Storage

The application uses localStorage for data persistence:

- `kalakriti_currentUser` - Current user session
- `kalakriti_cart` - Shopping cart items
- `customPaintings` - User-uploaded artworks

## 🎨 Design Highlights

- **Color Scheme**: Purple gradient (#6a11cb to #2575fc) with accent colors
- **Typography**: Segoe UI font family for clean readability
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoints at 768px and 480px
- **Accessibility**: Proper focus states and semantic HTML

## 📱 Responsive Design

- **Desktop**: Full-featured layout with sidebars and multi-column grids
- **Tablet**: Adjusted grid layouts and navigation
- **Mobile**: Single-column layouts, hamburger menu, touch-friendly buttons

## 🚀 Performance Optimizations

- Lazy loading of page components
- Image optimization
- CSS animations using GPU acceleration
- Efficient state management
- Minimal re-renders with React hooks

## 🔮 Future Enhancements

- Backend API integration
- Payment gateway integration
- Real-time auction updates with WebSockets
- Email notifications
- Advanced analytics dashboard
- Social sharing features
- Wishlist functionality
- Artist verification system

## 📄 License

This project is created for educational purposes.

## 👥 Credits

Developed as a Front-End Engineering project showcasing modern React development practices and e-commerce functionality.

---

**Note**: This is a front-end demonstration project. In production, sensitive operations like authentication and payments would require a secure backend API.
