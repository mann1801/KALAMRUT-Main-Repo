import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import './Paintings.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);

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

  const load = () => {
    const key = getWishlistKey();
    const stored = localStorage.getItem(key);
    if (!stored) {
      setItems([]);
      return;
    }
    try {
      setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    }
  };

  const removeItem = (id) => {
    const key = getWishlistKey();
    const next = items.filter(it => it.id !== id);
    localStorage.setItem(key, JSON.stringify(next));
    setItems(next);
  };

  const moveToCart = (it) => {
    const user = localStorage.getItem('user');
    let cartKey = 'cart_guest';
    if (user) {
      try {
        const userData = JSON.parse(user);
        cartKey = `cart_${userData.email || 'guest'}`;
      } catch {}
    }
    const stored = localStorage.getItem(cartKey);
    let cart = stored ? JSON.parse(stored) : [];
    const existingIndex = cart.findIndex(ci => ci.artwork && ci.artwork.id === it.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = Math.min(5, (cart[existingIndex].quantity || 1) + 1);
    } else {
      cart.push({ artwork: { id: it.id, name: it.name, image: it.image }, price: it.price, quantity: 1 });
    }
    localStorage.setItem(cartKey, JSON.stringify(cart));

    // Show feedback and then navigate so the toast is visible
    toast.success(`added to cart`, {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    setTimeout(() => navigate('/cart'), 1200);
  };

  const handleEditStart = (field) => {
    setEditingField(field);
    if (field === 'username') setTempUsername(username);
    if (field === 'email') setTempEmail(email);
  };

  const handleEditCancel = () => {
    setEditingField(null);
  };

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

  useEffect(() => {
    // Load user data
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
    
    load();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [load]);

  return (
    <div className="paintings-page">
      <nav className="paintings-navbar">
        <div className="nav-left">
          <div 
            className="nav-link" 
            onClick={() => {
              console.log('Logo clicked!');
              window.location.href = '/ai-art';
            }}
            style={{cursor: 'pointer', zIndex: 9999, position: 'relative'}}
          >
            <div className="nav-brand">AI कलामृत</div>
          </div>
        </div>
        <div className="nav-center">
          <div 
            className="nav-link" 
            onClick={() => {
              console.log('Buy Paintings clicked!');
              window.location.href = '/paintings';
            }}
            style={{cursor: 'pointer', zIndex: 9999, position: 'relative'}}
          >
            Buy Paintings
          </div>
          <div 
            className="nav-link" 
            onClick={() => {
              console.log('My Cart clicked!');
              window.location.href = '/cart';
            }}
            style={{cursor: 'pointer', zIndex: 9999, position: 'relative'}}
          >
            🛒 My Cart
          </div>
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

      <main className="paintings-main" style={{paddingTop: 120}}>
        <header className="paintings-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="main-title">Your Wishlist</h1>
              <p className="main-subtitle">All artworks you loved are saved here</p>
            </div>
          </div>
        </header>

        <div className="paintings-content">
          {items.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">❤️</div>
                <h3 style={{ color: '#FFFFFF' }}>No items in your wishlist</h3>
                <p style={{ color: '#FFFFFF' }}>Browse our collection and tap the heart to save artworks here.</p>
                <button className="clear-filters-btn" onClick={() => navigate('/paintings')}>Explore Paintings</button>
              </div>
            </div>
          ) : (
            <div className="paintings-grid">
              {items.map(it => (
                <div key={it.id} className="painting-card" onClick={() => navigate('/paintings')}>
                  <div className="painting-image-container">
                    <img src={it.image} alt={it.name} className="painting-image" />
                    <div className="painting-badge">{it.category}</div>
                  </div>
                  <div className="painting-info">
                    <h3 className="painting-title">{it.name}</h3>
                    <div className="painting-meta">
                      <span className="painting-year">{it.year}</span>
                      <span className="painting-price">₹{it.price.toFixed(2)}</span>
                    </div>
                    <div className="painting-actions">
                      <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); moveToCart(it); }}>Add to Cart</button>
                      <button className="wishlist-btn active" onClick={(e) => { e.stopPropagation(); removeItem(it.id); }} title="Remove from Wishlist">♥</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
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
      <ScrollToTop />
      {/* Toasts */}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Wishlist;
