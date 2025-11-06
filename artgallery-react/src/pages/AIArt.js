import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WallScanner from '../components/WallScanner';
import './AIArt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart, faPencilAlt, faCheck, faTimes, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const AIArt = () => {
  const [showWallScanner, setShowWallScanner] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Refs for scrolling to sections
  const servicesRef = useRef(null);
  const futureScopeRef = useRef(null);
  const contactRef = useRef(null);
  const wallScannerRef = useRef(null);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

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
    const token = localStorage.getItem('access'); // Get the access token
  
    if (!token) {
      alert('Please log in to update your profile');
      setIsUpdating(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/auth/update-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
        },
        body: JSON.stringify({
          [field]: field === 'username' ? tempUsername : tempEmail
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
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

  // Load user and cart from localStorage on component mount
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

    // Load cart items count using user-specific key
    const cartKey = getCartKey();
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      try {
        const cartItems = JSON.parse(storedCart);
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(itemCount);
      } catch (err) {
        console.error("Failed to parse stored cart", err);
      }
    }
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  
  const showProfile = () => {
    setShowProfileModal(true);
    setShowProfileDropdown(false);
  };

  return (
    <div className="ai-art-container">
      {/* Navigation Bar */}
      <nav className="ai-navbar">
        <div className="nav-left">
        <div className="nav-brand">AI कलामृत</div>
        </div>
        <div className="nav-center">
          <button 
            className="nav-link" 
            onClick={() => navigate('/')}
          >
            Home Page
          </button>
          
          <button className="nav-link" onClick={() => navigate('/paintings')}>Buy Paintings</button>
          <button className="nav-link cart-link" onClick={() => navigate('/cart')}>
            <FontAwesomeIcon icon={faShoppingCart} /> My Cart
            {cartItemCount > 0 && <span className="cart-count"></span>}
          </button>
          <button className="nav-link" onClick={() => navigate('/wishlist')}>❤️ Wishlist</button>
        </div>
        <div className="nav-right" ref={dropdownRef}>
          {username && (
            <div className="user-profile-container">
              <div className="user-profile-trigger" onClick={toggleProfileDropdown}>
                👤 {username}
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
          )}
        </div>
      </nav>

      {/* Back to Top Button */}
      {showScroll && (
        <button 
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} style={{ color: '#fff', fontSize: '24px' }} />
        </button>
      )}
      
      {/* Main Scrollable Content */}
      <main className="ai-main-content">
        {/* Hero Section */}
        <section className="parallax-section"  style={{ backgroundImage: "url('/assets/gwork5.jpg')" }}>
          <h1>Welcome to the Future of AI Art</h1>
          <p>Your one-stop destination for AI-driven creativity. Explore our services, vision, and innovative tools.</p>
          <div className="scroll-links">
            <button className="ai-button" onClick={() => scrollToSection(servicesRef)}>Services</button>
            <button className="ai-button" onClick={() => scrollToSection(futureScopeRef)}>Future Scope</button>
            <button className="ai-button" onClick={() => scrollToSection(contactRef)}>Contact</button>
            <button className="ai-button" onClick={() => scrollToSection(wallScannerRef)}>MyWallScanner AI</button>
          </div>
        </section>

        {/* Services Section */}
        <section  ref={servicesRef}  className="parallax-section"  style={{ backgroundImage: "url('/assets/parallax2.jpg')" }}>
          <h2>Our Services</h2>
          <p>
            Explore the features of our AI Art Gallery that make your art journey seamless and enjoyable.
          </p>

          <div className="services-container">
            {/* Card 1 */}
            <div className="service-card">
              <h3>🖼️ Scan Wall</h3>
              <p>
                Use our AI-powered wall scanner to visualize how different artworks 
                will look on your wall before making a purchase.
              </p>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <h3>🛒 Buy Paintings</h3>
              <p>
                Browse and purchase unique AI-generated or handpicked paintings 
                effortlessly through our secure platform.
              </p>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <h3>💖 Wishlist Items</h3>
              <p>
                Save your favorite artworks to your personal wishlist 
                and revisit them anytime when you’re ready to buy.
              </p>
            </div>
          </div>
        </section>


        {/* Future Scope Section */}
        <section  ref={futureScopeRef}  className="parallax-section"  style={{ backgroundImage: "url('/assets/parallax4.jpg')" }}>
          <h2>Future Scope</h2>
          <p>
            We are constantly exploring new horizons where technology meets creativity. 
            Here’s what the future holds for our AI-powered art gallery:
          </p>

          <div className="future-scope-container">
            <div className="future-card">
              <span className="future-icon">🎨</span>
              <h3>Digital Painting</h3>
              <p>Next-gen AI algorithms to create high-resolution, lifelike digital paintings with unique styles.</p>
            </div>

            <div className="future-card">
              <span className="future-icon">🏛️</span>
              <h3>3D Art Gallery</h3>
              <p>Step into immersive 3D galleries where you can walk around and experience art like never before.</p>
            </div>

            <div className="future-card">
              <span className="future-icon">🎶</span>
              <h3>AI-Composed Music</h3>
              <p>Background music dynamically generated by AI to complement every artwork you view.</p>
            </div>

            <div className="future-card">
              <span className="future-icon">🤝</span>
              <h3>Collaborative Creations</h3>
              <p>Artists and AI working hand-in-hand to push creative boundaries and craft masterpieces together.</p>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section ref={contactRef} className="parallax-section" style={{ backgroundImage: "url('/assets/parallax3.jpg')" }}>
          <h2>Contact Us</h2>
          <p>
            Got questions, feedback, or a collaboration idea? 
            We’d love to hear from you!  
            You can reach us anytime at{" "}
            <a href="mailto:contact@aiartgallery.com" style={{ color: "#d4af37" }}>
              contact@aiartgallery.com
            </a>.  
            Stay connected with us on social media for the latest artworks, updates, and announcements.
          </p>

          <button className="ai-button primary-action-btn"
            onClick={() => navigate("/Contact")} 
          >
            Get in Touch
          </button>
        </section>


        {/* MyWallScanner AI Section */}
        <section ref={wallScannerRef} className="parallax-section" style={{ backgroundImage: "url('/assets/parallax5.jpg')" }}>
          <h2>WallScanner AI</h2>
          <p>Visualize how a piece of art will look in your own space. Our MyWallScanner AI tool uses your device's camera to project artwork onto your wall in real-time. Click the button below to try it out!</p>
          <button className="ai-button primary-action-btn" onClick={() => setShowWallScanner(true)}>
            Launch Wall Scanner
          </button>
        </section>
      </main>

      {/* Wall Scanner Modal */}
      {showWallScanner && (
        <WallScanner onClose={() => setShowWallScanner(false)} />
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
  );
};

export default AIArt;