import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart, faSearch, faFilter, faPencilAlt, faCheck, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import ArtworkPopup from '../components/ArtworkPopup';
import Footer from '../components/Footer';
import paintingsData from '../data/paintings';
import ScrollToTop from '../components/ScrollToTop';
import './Paintings.css';

const Paintings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  // Load user data and cart count on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUsername(user.name || user.username || '');
        setEmail(user.email || '');
      } catch (err) {
        console.error("Failed to parse stored user", err);
      }
    }
    
    updateCartCount();
    loadWishlist();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getWishlistKey = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return `wishlist_${userData.email || 'guest'}`;
      } catch (e) {
        return 'wishlist_guest';
      }
    }
    return 'wishlist_guest';
  };

  const loadWishlist = () => {
    try {
      const key = getWishlistKey();
      const stored = localStorage.getItem(key);
      if (!stored) return;
      const items = JSON.parse(stored);
      const ids = new Set(items.map(it => it.id));
      setWishlistIds(ids);
    } catch (err) {
      console.error('Failed to load wishlist', err);
    }
  };

  const toggleWishlist = (artwork) => {
    try {
      const key = getWishlistKey();
      const stored = localStorage.getItem(key);
      let items = [];
      if (stored) {
        items = JSON.parse(stored);
      }
      const exists = items.find(it => it.id === artwork.id);
      if (exists) {
        items = items.filter(it => it.id !== artwork.id);
      } else {
        const { id, name, price, image, year, category } = artwork;
        items.push({ id, name, price, image, year, category });
      }
      localStorage.setItem(key, JSON.stringify(items));
      setWishlistIds(new Set(items.map(it => it.id)));
    } catch (err) {
      console.error('Failed to toggle wishlist', err);
    }
  };

  const updateCartCount = () => {
    const user = localStorage.getItem('user');
    let cartKey = 'cart_guest';
    
    if (user) {
      try {
        const userData = JSON.parse(user);
        cartKey = `cart_${userData.email || 'guest'}`;
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
    
    const cart = localStorage.getItem(cartKey);
    if (cart) {
      try {
        const cartItems = JSON.parse(cart);
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(count);
      } catch (e) {
        console.error('Error parsing cart', e);
      }
    }
  };

  // Handle edit start
  const handleEditStart = (field) => {
    setEditingField(field);
    if (field === 'username') setTempUsername(username);
    if (field === 'email') setTempEmail(email);
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditingField(null);
  };

  // Handle save changes
  const handleSave = async (field) => {
    if ((field === 'username' && !tempUsername.trim()) || 
        (field === 'email' && !tempEmail.trim())) {
      alert(`${field} cannot be empty`);
      return;
    }
  
    setIsUpdating(true);
    let token = localStorage.getItem('access');
  
    if (!token) {
      alert('Please log in to update your profile');
      setIsUpdating(false);
      return;
    }
  
    try {
      let response = await fetch('http://localhost:8000/api/auth/update-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [field]: field === 'username' ? tempUsername : tempEmail
        })
      });
  
      // If token expired/invalid, try one automatic refresh and retry once
      if (response.status === 401) {
        const refresh = localStorage.getItem('refresh');
        if (refresh) {
          try {
            const refreshRes = await fetch('http://localhost:8000/api/auth/token/refresh/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh })
            });
            const refreshData = await refreshRes.json();
            if (refreshRes.ok && refreshData.access) {
              localStorage.setItem('access', refreshData.access);
              localStorage.setItem('token', refreshData.access);
              token = refreshData.access;
              // retry update
              response = await fetch('http://localhost:8000/api/auth/update-profile/', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  [field]: field === 'username' ? tempUsername : tempEmail
                })
              });
            }
          } catch (_) { /* ignore and fall through */ }
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || 'Failed to update profile');
      }
  

      
      // Update local state and localStorage
      if (field === 'username') {
        setUsername(tempUsername);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.username = tempUsername;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setEmail(tempEmail);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.email = tempEmail;
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      setEditingField(null);
      alert(`${field === 'username' ? 'Username' : 'Email'} updated successfully!`);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    // Get user data before clearing it
    const userData = localStorage.getItem('user');
    
    // Clear user authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('token'); // Also clear the token alias if it exists
    
    // Note: We're not removing the cart data anymore
    // The cart data will remain in localStorage with the user's email as the key
    // and will be accessible when the user logs back in
    
    // Force a full page reload to ensure clean state
    window.location.href = '/';
  };

  const showProfile = () => {
    setShowProfileModal(true);
    setShowProfileDropdown(false);
  };

  // Filter and sort paintings
  const filteredPaintings = paintingsData
    .filter(painting => {
      const matchesSearch = painting.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || painting.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        default:
          return 0;
      }
    });

  // Get unique categories for filter
  const categories = ['All', ...new Set(paintingsData.map(painting => painting.category))];

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden';
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'auto';
    updateCartCount();
  };

  return (
    <>
    <div className="paintings-page">
      {/* Navbar */}
      <nav className="paintings-navbar">
        <div className="nav-left">
        <button className="nav-link" onClick={() => navigate('/ai-art')}><div className="nav-brand">AI कलामृत</div></button>
        </div>
        <div className="nav-center">
          <button className="nav-link" onClick={() => navigate('/wishlist')}>
            <FontAwesomeIcon icon={faHeart} />Wishlist
          </button>
          <button className="nav-link cart-link" onClick={() => navigate('/cart')}>
            <FontAwesomeIcon icon={faShoppingCart} /> My Cart
            {cartItemCount > 0 && <span className="cart-count"></span>}
          </button>
        </div>
        <div className="nav-right" ref={dropdownRef}>
          {localStorage.getItem('user') ? (
            <div className="user-profile-container">
              <div 
                className="user-profile-trigger" 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <FontAwesomeIcon icon={faUser} /> {username || 'My Account'}
              </div>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={showProfile}>
                    <FontAwesomeIcon icon={faUser} /> View Profile
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate('/login')}>
              <FontAwesomeIcon icon={faUser} /> Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="paintings-main">
        <header className="paintings-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="main-title">Discover Masterpieces</h1>
              <p className="main-subtitle">Explore our curated collection of exceptional artworks from renowned artists</p>
            </div>
            
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{filteredPaintings.length}</span>
                <span className="stat-label">Artworks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{categories.length - 1}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          
          <div className="search-filter-container">
            <div className="search-section">
              <div className="search-box">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search artworks, styles, colors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchTerm('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div className="filter-section">
              <div className="filter-group">
                <label className="filter-label">
                  <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                  Category
                </label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year">Year: Oldest First</option>
                  <option value="year-desc">Year: Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="paintings-content">
          {filteredPaintings.length > 0 ? (
            <>
              <div className="results-info">
                <span className="results-count">
                  Showing {filteredPaintings.length} of {paintingsData.length} artworks
                </span>
                {searchTerm && (
                  <span className="search-term">
                    for "{searchTerm}"
                  </span>
                )}
              </div>
              
              <div className="paintings-grid">
                {filteredPaintings.map((painting) => (
                  <div 
                    key={painting.id} 
                    className="painting-card"
                    onClick={() => handleArtworkClick(painting)}
                  >
                    <div className="painting-image-container">
                      <img 
                        src={painting.image} 
                        alt={painting.name} 
                        className="painting-image"
                        loading="lazy"
                      />
                      <div className="painting-overlay">
                        <div className="overlay-content">
                          <button className="view-details-btn">
                            <span>View Details</span>
                            <span className="btn-arrow">→</span>
                          </button>
                          <div className="quick-info">
                            {/* <span className="quick-price">₹{painting.price.toFixed(2)}</span> */}
                            <span className="quick-year">{painting.year}</span>
                          </div>
                        </div>
                      </div>
                      <div className="painting-badge">
                        {painting.category}
                      </div>
                    </div>
                    <div className="painting-info">
                      <h3 className="painting-title">{painting.name}</h3>
                      <div className="painting-meta">
                        <span className="painting-year">{painting.year}</span>
                        {/* <span className="painting-price">₹{painting.price.toFixed(2)}</span> */}
                      </div>
                      <div className="painting-actions">
                        <button className="add-to-cart-btn">
                          Add to Cart
                        </button>
                        <button 
                          className={`wishlist-btn ${wishlistIds.has(painting.id) ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(painting); }}
                          title={wishlistIds.has(painting.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          {wishlistIds.has(painting.id) ? '♥' : '♡'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">🎨</div>
                <h3>No artworks found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <button 
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Artwork Popup */}
      {selectedArtwork && (
        <ArtworkPopup 
          artwork={selectedArtwork} 
          onClose={handleClosePopup} 
        />
      )}

      {/* User Profile Modal */}
      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>User Profile</h2>
              <button className="close-button" onClick={() => setShowProfileModal(false)}>×</button>
            </div>
            <div className="profile-modal-content">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <div className="profile-field">
                  <label>Username:</label>
                  {editingField === 'username' ? (
                    <div className="edit-field">
                      <input
                        type="text"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="edit-input"
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button 
                          onClick={() => handleSave('username')} 
                          className="save-btn"
                          disabled={isUpdating}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button 
                          onClick={handleEditCancel}
                          className="cancel-btn"
                          disabled={isUpdating}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="field-value">
                      <span>{username}</span>
                      <button 
                        onClick={() => handleEditStart('username')} 
                        className="edit-btn"
                        title="Edit username"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  {editingField === 'email' ? (
                    <div className="edit-field">
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="edit-input"
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button 
                          onClick={() => handleSave('email')} 
                          className="save-btn"
                          disabled={isUpdating}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button 
                          onClick={handleEditCancel}
                          className="cancel-btn"
                          disabled={isUpdating}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="field-value">
                      <span>{email}</span>
                      <button 
                        onClick={() => handleEditStart('email')} 
                        className="edit-btn"
                        title="Edit email"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <ScrollToTop />
    <Footer />
    </>
  );
};

export default Paintings;