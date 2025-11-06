import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-2">
    <div className="container">
              <p>&copy; 2025 कलामृत. All rights reserved.</p>
      <p>Follow us: 
        <a 
          href="https://www.instagram.com/artmumbaiofficial/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white me-3"
        >
          <FontAwesomeIcon icon={faInstagram} className="me-1" /> Instagram
        </a>

        <a 
          href="https://www.facebook.com/artmumbaiofficial" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white me-3"
        >
          <FontAwesomeIcon icon={faFacebook} className="me-1" /> Facebook
        </a>

        <a 
          href="https://x.com/X_ArtGallery" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white"
        >
          <FontAwesomeIcon icon={faTwitter} className="me-1" /> Twitter
        </a>
      </p>

    </div>
  </footer>
);

export default Footer; 