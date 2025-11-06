import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ArtworkPopup.css';

const ArtworkPopup = ({ artwork, onClose }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Generate a random price between 50 and 500
    const randomPrice = Math.floor(Math.random() * 451) + 50;
    setPrice(randomPrice);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, Math.min(prevQuantity + amount, 5)));
  };

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

  const handleAddToCart = () => {
    const cartKey = getCartKey();
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem(cartKey);
    let cartItems = [];
    
    if (existingCart) {
      try {
        cartItems = JSON.parse(existingCart);
      } catch (err) {
        console.error("Failed to parse cart", err);
      }
    }
    
    // Check if this artwork is already in cart
    const existingItemIndex = cartItems.findIndex(item => 
      item.artwork.name === artwork.name && item.artwork.image === artwork.image
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart (up to max of 5)
      const newQuantity = Math.min(cartItems[existingItemIndex].quantity + quantity, 5);
      cartItems[existingItemIndex].quantity = newQuantity;
      toast.info(`Updated quantity in cart to ${newQuantity}`);
    } else {
      // Add new item to cart
      cartItems.push({
        artwork,
        quantity,
        price,
      });
      toast.success('Added to cart!');
    }
    
    // Save updated cart to localStorage with user-specific key
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  };

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: { 
        artwork,
        quantity,
        price,
        total: price * quantity
      }
    });
  };
  if (!artwork) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-body">
          <div className="popup-image-container">
            <img src={artwork.image} alt={artwork.name} className="popup-image" />
          </div>
          <div className="popup-details-container">
            <h1>{artwork.name || 'Artwork Title'}</h1>

            <div className="price-section">
              <p className="price-label">Price:</p>
              <p className="price-value">₹{price.toFixed(2)}</p>
            </div>

            <div className="quantity-section">
              <p className="quantity-label">Quantity:</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
              <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkPopup;
