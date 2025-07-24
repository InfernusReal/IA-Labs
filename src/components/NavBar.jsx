import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the About page
  const isAboutPage = location.pathname === '/about';

  // Check for saved theme preference or default to dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // If no saved theme, default to dark mode
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Handle navbar visibility on scroll
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show navbar when scrolling up or at top
          if (currentScrollY < lastScrollY || currentScrollY < 100) {
            setIsNavbarVisible(true);
          } 
          // Hide navbar when scrolling down and past 100px
          else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsNavbarVisible(false);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    console.log('🍔 HAMBURGER BUTTON CLICKED!!!');
    console.log('🍔 Current isMobileMenuOpen:', isMobileMenuOpen);
    alert('Hamburger button clicked! Current state: ' + isMobileMenuOpen);
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      console.log('🍔 Setting mobile menu to:', newState);
      alert('Setting mobile menu to: ' + newState);
      return newState;
    });
  };

  const closeMobileMenu = () => {
    console.log('❌ Closing mobile menu');
    alert('Closing mobile menu');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="navbar-container">
          {/* Left side with Mobile Menu Button and Desktop Navigation */}
          <div className="navbar-left">
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            
            {/* Desktop Navigation Links */}
            <ul className="navbar-menu">
              <li className="navbar-item">
                <Link to="/services" className="navbar-link">Services</Link>
              </li>
              <li className="navbar-item">
                <Link to="/case-studies" className="navbar-link">Case Studies</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about" className="navbar-link">About Us</Link>
              </li>
              <li className="navbar-item">
                <Link to="/contact" className="navbar-link">Contact Us</Link>
              </li>
            </ul>
            
            {/* Desktop Theme Toggle - Hidden on About page */}
            {!isAboutPage && (
              <button 
                className="theme-toggle desktop-theme-toggle" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <img 
                  src={isDarkMode ? "/light_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" : "/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"} 
                  alt={isDarkMode ? "Light mode" : "Dark mode"}
                  className="theme-icon"
                />
              </button>
            )}
          </div>

          {/* Right Logo */}
          <div className="navbar-right">
            <Link to="/" className="navbar-logo">
              <img 
                src={isDarkMode ? "/IA-Labs-Logo-Dark (1).png" : "/IA-Labs-Logo-Light (1).png"} 
                alt="IA Labs Logo" 
                className="logo"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay and Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-header">
              <div className="mobile-menu-logo">
                <img 
                  src={isDarkMode ? "/IA-Labs-Logo-Dark (1).png" : "/IA-Labs-Logo-Light (1).png"} 
                  alt="IA Labs Logo" 
                />
                <span className="mobile-menu-brand">IA-Labs</span>
              </div>
              <button className="mobile-menu-close" onClick={closeMobileMenu}>
                ✕
              </button>
            </div>
            
            <nav className="mobile-menu-nav">
              <Link to="/services" className="mobile-menu-link" onClick={closeMobileMenu}>
                Services
              </Link>
              <Link to="/case-studies" className="mobile-menu-link" onClick={closeMobileMenu}>
                Case Studies
              </Link>
              <Link to="/about" className="mobile-menu-link" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link to="/contact" className="mobile-menu-link" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;