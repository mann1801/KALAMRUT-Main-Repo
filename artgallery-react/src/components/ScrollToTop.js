import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

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

  if (!showScroll) return null;

  return (
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
  );
};

export default ScrollToTop;
