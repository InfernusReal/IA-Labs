import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './HomePage.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HomePage = () => {
  // Refs for animations
  const homePageRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);

  // State
  const [isLoaded, setIsLoaded] = useState(false);

  // Framer Motion hooks
  const isServicesInView = useInView(servicesRef, { once: true, threshold: 0.1 });
  const isFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Create floating particles effect
  useEffect(() => {
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      container.innerHTML = ''; // Clear existing particles

      for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'homeParticle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
      }
    };

    createParticles();
    setIsLoaded(true);
  }, []);

  // Advanced GSAP Animations
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Hero section entrance
      const tl = gsap.timeline();

      tl.fromTo('.home-hero-title', 
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power4.out' }
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, '-=1.2'
      )
      .fromTo('.hero-buttons', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8'
      )
      .fromTo('.hero-stats .stat', 
        { opacity: 0, y: 50, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)' 
        }, '-=0.6'
      )
      .fromTo('.dashboard-container', 
        { opacity: 0, x: 150, rotateY: -20 },
        { 
          opacity: 1, 
          x: 0, 
          rotateY: 0,
          duration: 2, 
          ease: 'power4.out' 
        }, '-=1.5'
      );

      // Continuous animations
      gsap.to('.dashboard-container', {
        y: -15,
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });

      gsap.to('.gradient-text', {
        backgroundPosition: '200% center',
        duration: 4,
        ease: 'none',
        repeat: -1
      });

      // Particles movement
      gsap.to('.homeParticle', {
        y: '-=30',
        x: '+=20',
        duration: 6,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: 'random'
        }
      });

      // Services section
      ScrollTrigger.create({
        trigger: '.services-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.service-card', 
            { opacity: 0, y: 100, scale: 0.8, rotateX: 45 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0,
              duration: 1.5,
              stagger: 0.2,
              ease: 'power4.out'
            }
          );

          gsap.fromTo('.services-title', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
          );

          gsap.fromTo('.services-subtitle', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
          );
        }
      });

      // Features section
      ScrollTrigger.create({
        trigger: '.features-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.features-title', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
          );

          gsap.fromTo('.feature-card', 
            { opacity: 0, x: -80, rotateY: -15 },
            { 
              opacity: 1, 
              x: 0,
              rotateY: 0,
              duration: 1.3,
              stagger: 0.15,
              ease: 'power4.out'
            }
          );
        }
      });

      // CTA section
      ScrollTrigger.create({
        trigger: '.cta-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.cta-content', 
            { opacity: 0, y: 80, scale: 0.9 },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power4.out'
            }
          );
        }
      });

    }, homePageRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Services data
  const services = [
    {
      icon: '🌐',
      title: 'Custom Websites',
      description: 'Beautiful, responsive websites tailored to your brand and business needs with cutting-edge technology.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern UI/UX'],
      accent: false,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚡',
      title: 'SaaS Solutions',
      description: 'Powerful software as a service platforms to streamline your business operations and boost productivity.',
      features: ['Cloud-Based', 'Scalable Architecture', 'One-Time Payment', 'Premium Support'],
      accent: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '🚀',
      title: 'Fast-Track Delivery',
      description: 'Need it fast? Our express service delivers your project in record time without compromising quality.',
      features: ['Premium Fast Delivery', 'Priority Support', 'Premium Features', '24/7 Monitoring'],
      accent: false,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  // Features data
  const features = [
    {
      icon: '💡',
      title: 'Innovative Solutions',
      description: 'Cutting-edge technology meets creative design for exceptional results that drive business growth.'
    },
    {
      icon: '🎯',
      title: 'Targeted Approach',
      description: 'Every project is tailored to your specific business goals and requirements for maximum impact.'
    },
    {
      icon: '🔧',
      title: 'Full-Stack Expertise',
      description: 'From frontend to backend, we handle every aspect of your project with professional excellence.'
    },
    {
      icon: '📈',
      title: 'Growth-Focused',
      description: 'Built to scale with your business and drive measurable results that matter to your bottom line.'
    },
    {
      icon: '🛡️',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliability you can trust with your most important digital assets.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance across all devices and platforms for the best user experience.'
    }
  ];

  return (
    <div className="home-page" ref={homePageRef}>
      {/* Floating Particles */}
      <div className="homeParticlesContainer" ref={particlesRef}></div>

      {/* Video Background with Enhanced Overlay */}
      <motion.div 
        className="video-background"
        style={{ y: parallaxY }}
      >
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/Bg-Cool1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        <div className="video-gradient-overlay"></div>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="hero-section" 
        ref={heroRef}
        style={{ opacity: heroOpacity }}
      >
        <div className="hero-container">
          <div className="hero-content">
            <motion.h1 
              className="home-hero-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              Build Your Digital Future with
              <span className="gradient-text"> IA-Labs</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              We craft stunning websites and powerful SaaS solutions with one-time payments. 
              Choose our fast-track option for lightning-fast delivery and premium support.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <Link to="/contact" className="cta-button primary">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                  <span className="button-arrow">→</span>
                </motion.span>
              </Link>
              <Link to="/about" className="cta-button secondary">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn About Us
                </motion.span>
              </Link>
            </motion.div>
            
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {[
                { number: '50+', label: 'Projects Delivered' },
                { number: 'Premium', label: 'Fast-Track Delivery' },
                { number: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Dashboard Visual */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
          >
            <div className="dashboard-container">
              <div className="dashboard-glow"></div>
              <div className="dashboard-monitor">
                <div className="monitor-bezel">
                  <div className="monitor-screen">
                    <div className="dashboard-header">
                      <div className="header-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <div className="header-title">IA-Labs Dashboard</div>
                      <div className="header-actions">
                        <span className="action-dot"></span>
                        <span className="action-dot"></span>
                        <span className="action-dot"></span>
                      </div>
                    </div>
                    <div className="dashboard-content">
                      <div className="sidebar">
                        <div className="dashboard-sidebar-logo">📊</div>
                        <div className="dashboard-sidebar-menu">
                          <div className="menu-item active">
                            <span className="menu-icon">🏠</span>
                            Dashboard
                          </div>
                          <div className="menu-item">
                            <span className="menu-icon">📁</span>
                            Projects
                          </div>
                          <div className="menu-item">
                            <span className="menu-icon">📊</span>
                            Analytics
                          </div>
                          <div className="menu-item">
                            <span className="menu-icon">📈</span>
                            Reports
                          </div>
                          <div className="menu-item">
                            <span className="menu-icon">⚙️</span>
                            Settings
                          </div>
                        </div>
                      </div>
                      <div className="main-content">
                        <div className="content-header">
                          <h3>Project Overview</h3>
                          <div className="status-badges">
                            <span className="badge success">Live</span>
                            <span className="badge warning">In Progress</span>
                            <span className="badge info">Planning</span>
                          </div>
                        </div>
                        <div className="dashboard-grid">
                          <div className="widget performance">
                            <h4>Website Performance</h4>
                            <div className="performance-graph">
                              <svg className="graph-svg" viewBox="0 0 160 60">
                                <defs>
                                  <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1"/>
                                  </linearGradient>
                                </defs>
                                <path 
                                  d="M 0 50 Q 40 30, 80 20 T 160 15" 
                                  stroke="#FFD700" 
                                  strokeWidth="2" 
                                  fill="none"
                                  className="performance-line"
                                />
                                <path 
                                  d="M 0 50 Q 40 30, 80 20 T 160 15 L 160 60 L 0 60 Z" 
                                  fill="url(#performanceGradient)"
                                />
                                <circle cx="160" cy="15" r="3" fill="#FFD700" className="data-point-active"/>
                              </svg>
                              <div className="performance-value">98.5%</div>
                            </div>
                          </div>
                          <div className="widget engagement">
                            <h4>User Engagement</h4>
                            <div className="metric-container">
                              <div className="metric-value">
                                <span className="value">94.2%</span>
                                <span className="trend up">↗ +12%</span>
                              </div>
                              <div className="engagement-ring">
                                <svg className="ring-svg" viewBox="0 0 36 36">
                                  <path
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#444"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#FFD700"
                                    strokeWidth="2"
                                    strokeDasharray="94.2, 100"
                                    className="engagement-progress"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="widget speed">
                            <h4>Page Speed</h4>
                            <div className="speed-container">
                              <div className="speed-indicator">
                                <div className="speed-bar">
                                  <div className="speed-fill" style={{width: '97%'}}></div>
                                </div>
                                <span className="speed-score">97/100</span>
                              </div>
                              <div className="speed-metrics">
                                <div className="metric">
                                  <span className="metric-label">FCP</span>
                                  <span className="metric-value">1.2s</span>
                                </div>
                                <div className="metric">
                                  <span className="metric-label">LCP</span>
                                  <span className="metric-value">2.1s</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={containerVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
          >
            <motion.h2 className="services-title" variants={itemVariants}>
              Our Premium <span className="gradient-text">Services</span>
            </motion.h2>
            <motion.p className="services-subtitle" variants={itemVariants}>
              Transform your digital presence with our cutting-edge solutions designed for modern businesses
            </motion.p>
          </motion.div>

          <motion.div 
            className="services-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={`service-card ${service.accent ? 'accent' : ''}`}
                  variants={{
                    ...itemVariants,
                    hover: {
                      y: -15,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }
                  }}
                  whileHover="hover"
                >
                <div className="service-background" style={{ background: service.gradient }}></div>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="service-button">
                  Get Started
                  <span className="button-arrow">→</span>
                </Link>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            <motion.h2 className="features-title" variants={itemVariants}>
              Why Choose <span className="gradient-text">IA-Labs</span>
            </motion.h2>
            <motion.p className="features-subtitle" variants={itemVariants}>
              We deliver exceptional results through innovation, expertise, and unwavering commitment to excellence
            </motion.p>
          </motion.div>

          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-background"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-background"></div>
        <motion.div 
          className="cta-container"
          variants={containerVariants}
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
        >
          <motion.div className="cta-content" variants={itemVariants}>
            <h2 className="cta-title">
              Ready to Transform Your 
              <span className="gradient-text"> Digital Presence?</span>
            </h2>
            <p className="cta-subtitle">
              Join the growing number of businesses that trust IA-Labs to deliver 
              exceptional digital solutions that drive real results.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary large">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project Today
                  <span className="button-arrow">→</span>
                </motion.span>
              </Link>
              <Link to="/about" className="cta-button secondary large">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                </motion.span>
              </Link>
            </div>
            <div className="cta-stats">
              <div className="cta-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Premium Support</span>
              </div>
              <div className="cta-stat">
                <span className="stat-number">Fast</span>
                <span className="stat-label">Delivery Available</span>
              </div>
              <div className="cta-stat">
                <span className="stat-number">One-Time</span>
                <span className="stat-label">Payment Options</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
