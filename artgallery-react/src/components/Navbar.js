import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkText }) => {
  const location = useLocation();
  const path = location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const navLinkStyle = {
    color: scrolled ? '#333' : '#fff',
    transition: 'color 0.3s ease-in-out'
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  return (
    <nav 
      className={`navbar navbar-expand-lg ${scrolled ? 'navbar-light scrolled' : 'navbar-dark'}`} 
      id="navbar"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: scrolled ? '#333' : '#fff' }}>
          <h3 className="ms-2" style={{ fontSize: '1.5rem', margin: 0 }}>कलामृत</h3>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className={`nav-link${path === '/' ? ' active' : ''}`} to="/" style={navLinkStyle}>Home</Link></li>
            <li className="nav-item"><Link className={`nav-link${path === '/artist' ? ' active' : ''}`} to="/artist" style={navLinkStyle}>Artists</Link></li>
            <li className="nav-item"><Link className={`nav-link${path === '/artfair' ? ' active' : ''}`} to="/artfair" style={navLinkStyle}>Art Fairs</Link></li>
            <li className="nav-item"><Link className={`nav-link${path === '/exhibition' ? ' active' : ''}`} to="/exhibition" style={navLinkStyle}>Exhibitions</Link></li>
            <li className="nav-item"><Link className={`nav-link${path === '/learn' ? ' active' : ''}`} to="/learn" style={navLinkStyle}>Learning Initiative</Link></li>
            <li className="nav-item"><Link className={`nav-link${path === '/media' ? ' active' : ''}`} to="/media" style={navLinkStyle}>Media</Link></li>
            <li className="nav-item"><Link className={`nav-link${path === '/contact' ? ' active' : ''}`} to="/contact" style={navLinkStyle}>Contact</Link></li>
            <li className="nav-item">
              <Link className={`nav-link${path === '/ai' ? ' active' : ''}`} to="/ai" style={navLinkStyle}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>🤖</span> AI
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 