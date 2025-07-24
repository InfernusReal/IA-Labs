import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AboutNavBar.css';

const AboutNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`aboutNavbar ${isScrolled ? 'aboutNavbarScrolled' : ''}`}>
      <div className="aboutNavbarContainer">
        <div className="aboutNavbarLeft">
          <Link to="/" className="aboutNavbarLogo" onClick={closeMobileMenu}>
            <img 
              src="/IA-Labs-Logo-Dark (1).png" 
              alt="IA Labs" 
              className="aboutNavbarLogoImage"
            />
          </Link>
        </div>

        <div className="aboutNavbarCenter">
          <div className={`aboutNavbarMenu ${isMobileMenuOpen ? 'aboutNavbarMenuOpen' : ''}`}>
            <Link 
              to="/" 
              className={`aboutNavbarLink ${location.pathname === '/' ? 'aboutNavbarLinkActive' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="aboutNavbarLinkText">Home</span>
              <span className="aboutNavbarLinkUnderline"></span>
            </Link>
            <Link 
              to="/services" 
              className={`aboutNavbarLink ${location.pathname === '/services' ? 'aboutNavbarLinkActive' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="aboutNavbarLinkText">Services</span>
              <span className="aboutNavbarLinkUnderline"></span>
            </Link>
            <Link 
              to="/about" 
              className={`aboutNavbarLink ${location.pathname === '/about' ? 'aboutNavbarLinkActive' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="aboutNavbarLinkText">About</span>
              <span className="aboutNavbarLinkUnderline"></span>
            </Link>
            <Link 
              to="/contact" 
              className={`aboutNavbarLink ${location.pathname === '/contact' ? 'aboutNavbarLinkActive' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="aboutNavbarLinkText">Contact</span>
              <span className="aboutNavbarLinkUnderline"></span>
            </Link>
          </div>
        </div>

        <div className="aboutNavbarRight">
          <Link to="/services" className="aboutNavbarCtaButton" onClick={closeMobileMenu}>
            <span className="aboutNavbarCtaText">Get Started</span>
            <span className="aboutNavbarCtaIcon">→</span>
          </Link>
        </div>

        <div className="aboutNavbarToggle" onClick={toggleMobileMenu}>
          <span className={`aboutNavbarToggleLine ${isMobileMenuOpen ? 'aboutNavbarToggleLineOpen' : ''}`}></span>
          <span className={`aboutNavbarToggleLine ${isMobileMenuOpen ? 'aboutNavbarToggleLineOpen' : ''}`}></span>
          <span className={`aboutNavbarToggleLine ${isMobileMenuOpen ? 'aboutNavbarToggleLineOpen' : ''}`}></span>
        </div>
      </div>

      {/* Sexy animated background elements */}
      <div className="aboutNavbarBgEffects">
        <div className="aboutNavbarBgEffect1"></div>
        <div className="aboutNavbarBgEffect2"></div>
        <div className="aboutNavbarBgEffect3"></div>
      </div>
    </nav>
  );
};

export default AboutNavBar;
