import { useState } from 'react'
import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// Public pages
import HomePage from './pages/HomePage'
import NewHomePage_Premium from './pages/NewHomePage_Premium'
import NewServicesPage from './pages/NewServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AboutNavBar from './components/AboutNavBar'
import MobileNavBar from './components/MobileNavBar'

// Main App Content component
const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      {/* Desktop Navbar */}
      <AboutNavBar />
      {/* Mobile Navbar - Only shows on mobile */}
      <MobileNavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<NewHomePage_Premium />} />
        <Route path="/old_homepage" element={<HomePage />} />
        <Route path="/services" element={<NewServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AppContent />
  )
}

export default App
