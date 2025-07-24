import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNavBar.css';

const MobileNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    console.log('🍔 Mobile navbar clicked!');
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar - Only visible on mobile */}
      <nav className="mobile-navbar">
        <div className="mobile-navbar-container">
          {/* Hamburger Menu Button */}
          <button 
            className="mobile-hamburger-button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`mobile-hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Centered Logo */}
          <div className="mobile-navbar-center">
            <Link to="/" className="mobile-navbar-logo" onClick={closeMobileMenu}>
              <img 
                src="/IA-Labs-Logo-Dark (1).png"
                alt="IA Labs Logo" 
                className="mobile-logo"
              />
            </Link>
          </div>

          {/* Right side spacer for balance */}
          <div className="mobile-navbar-spacer"></div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-sidebar-overlay" onClick={closeMobileMenu}></div>
          <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
            {/* Sidebar Header */}
            <div className="mobile-sidebar-header">
              <div className="mobile-sidebar-logo">
                <img 
                  src="/IA-Labs-Logo-Dark (1).png"
                  alt="IA Labs Logo" 
                />
                <span className="mobile-sidebar-brand">IA-Labs</span>
              </div>
              <button className="mobile-sidebar-close" onClick={closeMobileMenu}>
                ✕
              </button>
            </div>
            
            {/* Sidebar Navigation */}
            <nav className="mobile-sidebar-nav">
              <Link 
                to="/" 
                className={`mobile-sidebar-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`mobile-sidebar-link ${location.pathname === '/services' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className={`mobile-sidebar-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`mobile-sidebar-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavBar;
