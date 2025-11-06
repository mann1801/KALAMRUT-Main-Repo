import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from '../components/ScrollToTop';
import { faUser, faSignOutAlt, faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import './Cart.css';
import './Paintings.css';
// Helper function to get the cart key for the current user
const getCartKey = () => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const userData = JSON.parse(user);
      return `cart_${userData.email || 'guest'}`;
    } catch (e) {
      console.error('Error parsing user data', e);
    }
  }
  return 'cart_guest';
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);


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
    
    // Get the current user's cart key
    const cartKey = getCartKey();
    const storedCart = localStorage.getItem(cartKey);
    
    // Update the last user in localStorage
    const currentUser = localStorage.getItem('user') || 'guest';
    localStorage.setItem('lastCartUser', currentUser);
    
    // If there's no cart for this user, initialize an empty cart
    if (!storedCart) {
      setCartItems([]);
      setTotalPrice(0);
      return;
    }
    
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        
        // Calculate total price
        const total = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
      } catch (err) {
        console.error("Failed to parse stored cart", err);
      }
    }
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = Math.max(1, Math.min(updatedCart[index].quantity + change, 5));
    
    if (newQuantity !== updatedCart[index].quantity) {
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
      
      // Update localStorage with user-specific key
      const cartKey = getCartKey();
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      
      // Recalculate total
      const total = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(total);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    
    // Update localStorage with user-specific key
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    
    // Recalculate total
    const total = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const handleItemCheckout = (item) => {
    if (!item) return;
    
    navigate('/checkout', {
      state: { 
        artwork: item.artwork,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        itemId: item.artwork.id // Pass the item ID to identify it in the cart
      }
    });
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

  return (<>
    <div className="cart-page">
      <nav className="paintings-navbar">
        <button className="nav-link" onClick={() => navigate('/ai-art')}><div className="nav-brand">AI कलामृत</div></button>
          <div className="nav-center">
            <button className="nav-link" onClick={() => navigate('/paintings')}>Buy Paintings</button>
            <button className="nav-link" onClick={() => navigate('/wishlist')}>❤️ Wishlist</button>
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
      <div className="cart-container" style={{ marginTop: "130px" }}>
      
      <h1>My Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/ai-art')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image" style={{color:"#ffffff"}}>
                  <img src={item.artwork.image} alt={item.artwork.name} />
                </div>
                <div className="item-details" style={{color:"#ffffff"}}>
                  <h3 style={{color:"#ffffff"}}>{item.artwork.name}</h3>
                  <p className="item-price" style={{color:"#ffffff"}}>₹{item.price.toFixed(2)}</p>
                  
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  
                  <p className="item-subtotal" style={{color:"#ffffff"}}>
                    Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <div className="item-actions">
                    <button 
                      className="checkout-item-btn"
                      onClick={() => handleItemCheckout(item)}
                    >
                      Proceed to Checkout
                    </button>
                    <button 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2 style={{color:"#000000"}}>Order Summary</h2>
            <div className="summary-row" style={{color:"#000000"}}>
              <span>Total Items:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total" style={{color:"#000000"}}>
              <span> Total Price:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="continue-shopping-container">
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/ai-art')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
    
    {/* User Profile Modal - Moved outside cart container */}
    {showProfileModal && (
        <div 
          className="profile-modal-overlay" 
          onClick={() => setShowProfileModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
        >
          <div 
            className="profile-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#111',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              transform: 'none',
              margin: 0
            }}
          >
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
    <Footer/>
    <ScrollToTop />
    
  </>);
};

export default Cart;