// Checkout.js

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart, faHeart, faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import './Checkout.css';
import './Paintings.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork, quantity, price, total } = location.state || {};

  // 🔹 Navbar / Profile States (copied from Paintings.js)
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const dropdownRef = useRef(null);

  // Checkout states
  const [emailStatus, setEmailStatus] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    address: '',
    pincode: '',
    payment_method: 'COD',
    bank: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');

  // 🔹 Load user data for Navbar
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

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleEditStart = (field) => {
    setEditingField(field);
    if (field === 'username') setTempUsername(username);
    if (field === 'email') setTempEmail(email);
  };

  const handleEditCancel = () => setEditingField(null);

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

      if (!response.ok) throw new Error("Failed to update");

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
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const showProfile = () => {
    setShowProfileModal(true);
    setShowProfileDropdown(false);
  };

  // 🖼️ Checkout Logic
  if (!artwork) {
    return (
      <div className="checkout-container">
        <h2>No item selected for checkout.</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailStatus('');
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const invoiceNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);

    doc.setFontSize(22);
    doc.text('KALAMRUT ART GALLERY', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('INVOICE', 105, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoiceNumber}`, 20, 50);
    doc.text(`Date: ${date}`, 20, 60);

    doc.text(`Email: ${formData.email}`, 20, 90);
    doc.text(`Address: ${formData.address}`, 20, 100);
    doc.text(`Pincode: ${formData.pincode}`, 20, 110);

    doc.setFontSize(12);
    doc.text('Order Details', 20, 130);

    doc.setFillColor(200, 200, 200);
    doc.rect(20, 135, 170, 10, 'F');
    doc.text('Item', 22, 142);
    doc.text('Qty', 120, 142);
    doc.text('Price', 160, 142);

    doc.text(artwork.name, 22, 152);
    doc.text(quantity.toString(), 120, 152);
    doc.text(`₹${price.toFixed(2)}`, 160, 152);

    doc.setFontSize(14);
    doc.text(`Total: ₹${total.toFixed(2)}`, 20, 180);

    doc.setFontSize(10);
    doc.text('Thank you for your purchase!', 105, 200, { align: 'center' });

    doc.save(`invoice-${invoiceNumber}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateInvoice();
    setOrderError('');

    if (!formData.full_name || !formData.email || !formData.address || !formData.pincode) {
      setOrderError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // First, place the order
      await axios.post('http://localhost:8000/api/ai-art/orders/create/', {
        ...formData,
        artwork_name: artwork.name,
        quantity,
        total_price: total
      });

      // Email is already sent by the order creation endpoint, so no need for separate email call

      // After successful order, remove the item from the cart
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const cartKey = user?.email ? `cart_${user.email}` : 'cart_guest';
      const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      
      // Find and remove the exact item that was ordered
      let itemRemoved = false;
      const updatedCart = [];
      
      for (const item of cart) {
        if (item.artwork.id === artwork.id && !itemRemoved) {
          itemRemoved = true;
        } else {
          updatedCart.push(item);
        }
      }
      
      // Save the updated cart
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      
      // Update the cart count in the UI
      const newCartCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(newCartCount);
      
      alert("Order placed successfully! A confirmation email has been sent to " + formData.email);
      navigate('/ai-art');
    } catch (err) {
      setOrderError("Order failed. Please try again.");
      console.error("Order error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="checkout-page">
      {/* 🔹 Navbar */}
      <nav className="paintings-navbar">
        <div className="nav-left">
          <button className="nav-link" onClick={() => navigate('/ai-art')}>
            <div className="nav-brand">AI कलामृत</div>
          </button>
        </div>
        <div className="nav-center">
          <button className="nav-link" onClick={() => navigate('/wishlist')}>
            <FontAwesomeIcon icon={faHeart} /> Wishlist
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

      {/* 🔹 Checkout Content */}
      <div className="checkout-container" >
        <h2 style={{ marginTop: 50 , color: '#ffffff'}}>Checkout</h2>
         {orderError && <div className="error-message">{orderError}</div>} 
         <div className="order-summary"> 
            <h2 style={{ color: '#000000' }}>Order Summary</h2> 
            <h3>{artwork.name} - {artwork.artist}</h3> 
            <h4>Quantity: {quantity}</h4> 
            <h4>Price: ₹{price} each</h4> 
            <h4 className="total">Total: ₹{total}</h4> 
          </div> 
          <form className="checkout-form" onSubmit={handleSubmit}> 
            <h2 style={{ color: '#000000' }}>Shipping & Payment</h2> 
            <div className="form-group"> 
              <label>Full Name:</label> 
              <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} required /> 
            </div> 
            <div className="form-group"> 
              <label>Email:</label> 
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required /> 
            </div> 
            <div className="form-group"> 
              <label>Shipping Address</label> 
              <textarea name="address" onChange={handleInputChange} required></textarea> 
            </div> 
            <div className="form-group"> 
              <label>Pincode</label> 
              <input type="text" name="pincode" onChange={handleInputChange} required /> 
            </div> 
            <div className="form-group"> 
              <label>Payment Method:</label> 
              <select name="payment_method" value={formData.payment_method} onChange={handleInputChange} required > 
                <option value="COD">Cash on Delivery</option> 
                <option value="CARD">Credit/Debit Card</option> 
                <option value="UPI">UPI Payment</option> 
              </select> 
            </div> 
            {formData.payment_method === 'netbanking' && ( <div className="form-group"> 
              <label>Select Bank</label> 
              <select name="bank" onChange={handleInputChange}> 
                <option value="">-- Select Bank --</option> 
                <option value="bank1">Bank of Art</option> 
                <option value="bank2">Creative Bank</option> 
                <option value="bank3">Imagine Bank</option> 
              </select> 
            </div> )} 
            <button 
              type="submit" 
              className="checkout-button big-yellow-glow" 
              disabled={isSubmitting}
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                margin: '30px 40px 30px 80px',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.4)';
                  e.target.style.transform = 'scale(1.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            > 
              {isSubmitting ? 'Placing Order...' : 'Place Order'} 
            </button> 
            </form> 
            </div>

      {/* 🔹 Profile Modal */}
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
    <Footer />
    </>
  );
};

export default Checkout;
