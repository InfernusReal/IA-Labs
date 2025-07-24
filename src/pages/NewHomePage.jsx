import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import './NewHomePage.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const NewHomePage = () => {
  // Refs for animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);
  const cursorRef = useRef(null);

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Dynamic hero texts
  const heroTexts = [
    "Transform Your Digital Vision",
    "Build Tomorrow's Solutions",
    "Innovate Beyond Boundaries", 
    "Scale Your Business Dreams"
  ];

  // Framer Motion hooks
  const isServicesInView = useInView(servicesRef, { once: true, threshold: 0.1 });
  const isFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const servicesY = useTransform(scrollYProgress, [0.2, 0.8], ['20%', '-20%']);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 15,
          y: e.clientY - 15,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating particles system
  useEffect(() => {
    const createAdvancedParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      container.innerHTML = '';

      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'advanced-particle';
        
        const size = Math.random() * 6 + 2;
        const opacity = Math.random() * 0.8 + 0.2;
        const hue = Math.random() * 60 + 30; // Gold range
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = opacity;
        particle.style.background = `hsl(${hue}, 70%, 60%)`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        
        container.appendChild(particle);
      }
    };

    createAdvancedParticles();
    setIsLoaded(true);
  }, []);

  // Text rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Advanced GSAP Animations
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Master timeline
      const masterTL = gsap.timeline();

      // Hero entrance sequence
      masterTL
        .fromTo('.new-hero-title-main', 
          { opacity: 0, y: 120, scale: 0.8, rotateX: 90 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 2, ease: 'power4.out' }
        )
        .fromTo('.new-hero-subtitle', 
          { opacity: 0, y: 80, x: -50 },
          { opacity: 1, y: 0, x: 0, duration: 1.5, ease: 'power3.out' }, '-=1.5'
        )
        .fromTo('.new-hero-buttons', 
          { opacity: 0, y: 60, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, '-=1'
        )
        .fromTo('.new-hero-stats .new-stat', 
          { opacity: 0, y: 80, rotateY: 45 },
          { 
            opacity: 1, 
            y: 0, 
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out' 
          }, '-=0.8'
        )
        .fromTo('.new-hero-visual', 
          { opacity: 0, x: 200, rotateY: -30, scale: 0.8 },
          { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            scale: 1,
            duration: 2.5, 
            ease: 'power4.out' 
          }, '-=2'
        );

      // Continuous floating animations
      gsap.to('.new-hero-visual', {
        y: -20,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Gradient text animation
      gsap.to('.new-gradient-text', {
        backgroundPosition: '200% center',
        duration: 5,
        ease: 'none',
        repeat: -1
      });

      // Advanced particle movement
      gsap.to('.advanced-particle', {
        y: (i) => -100 - (Math.random() * 200),
        x: (i) => Math.random() * 100 - 50,
        rotation: 360,
        duration: (i) => 15 + Math.random() * 10,
        ease: 'none',
        repeat: -1,
        delay: (i) => Math.random() * 5
      });

      // Services section advanced animations
      ScrollTrigger.create({
        trigger: '.new-services-section',
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          const tl = gsap.timeline();
          
          tl.fromTo('.new-services-title', 
            { opacity: 0, y: 80, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' }
          )
          .fromTo('.new-services-subtitle', 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1'
          )
          .fromTo('.new-service-card', 
            { opacity: 0, y: 150, rotateX: 45, scale: 0.8 },
            { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              scale: 1,
              duration: 1.8,
              stagger: {
                amount: 0.6,
                from: "start"
              },
              ease: 'power4.out'
            }, '-=0.5'
          );
        }
      });

      // Features section with morphing effects
      ScrollTrigger.create({
        trigger: '.new-features-section',
        start: 'top 80%',
        onEnter: () => {
          const tl = gsap.timeline();
          
          tl.fromTo('.new-features-title', 
            { opacity: 0, y: 60, rotateX: 30 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power4.out' }
          )
          .fromTo('.new-feature-card', 
            { opacity: 0, x: -120, rotateY: -30, scale: 0.7 },
            { 
              opacity: 1, 
              x: 0,
              rotateY: 0,
              scale: 1,
              duration: 1.5,
              stagger: 0.15,
              ease: 'power4.out'
            }, '-=1'
          );
        }
      });

      // CTA section with dramatic entrance
      ScrollTrigger.create({
        trigger: '.new-cta-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.new-cta-content', 
            { opacity: 0, y: 100, scale: 0.9, rotateX: 20 },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 2,
              ease: 'power4.out'
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Data
  const services = [
    {
      icon: '🌐',
      title: 'Premium Websites',
      description: 'Cutting-edge websites that captivate, convert, and scale with your business ambitions.',
      features: ['Next.js & React', 'Premium UI/UX', 'SEO Mastery', 'Lightning Fast'],
      video: '/3129595-uhd_3840_2160_30fps.mp4',
      accent: false,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚡',
      title: 'SaaS Platforms',
      description: 'Revolutionary software solutions that transform businesses and deliver exceptional user experiences.',
      features: ['Cloud Architecture', 'Scalable Backend', 'Advanced Analytics', 'API Integration'],
      video: '/3163534-uhd_3840_2160_30fps.mp4',
      accent: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '🚀',
      title: 'Express Delivery',
      description: 'Premium fast-track service for urgent projects without compromising on quality or innovation.',
      features: ['48-72hr Delivery', 'Priority Support', 'Premium Features', 'Dedicated Team'],
      video: '/7101913-uhd_2560_1440_25fps.mp4',
      accent: false,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const features = [
    {
      icon: '💡',
      title: 'Revolutionary Innovation',
      description: 'Pioneering the future of digital experiences with breakthrough technologies and creative excellence.',
      color: '#FFD700'
    },
    {
      icon: '🎯',
      title: 'Precision Engineering',
      description: 'Every line of code, every design element crafted with surgical precision for maximum impact.',
      color: '#FF6B6B'
    },
    {
      icon: '🔧',
      title: 'Full-Stack Mastery',
      description: 'Complete end-to-end solutions from concept to deployment, handling every technical challenge.',
      color: '#4ECDC4'
    },
    {
      icon: '📈',
      title: 'Growth Catalyst',
      description: 'Solutions engineered to accelerate your business growth and drive measurable results.',
      color: '#45B7D1'
    }
  ];

  return (
    <div className="new-homepage" ref={containerRef}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      />

      {/* Advanced Floating Particles */}
      <div className="advanced-particles-container" ref={particlesRef}></div>

      {/* Hero Section with Multiple Video Backgrounds */}
      <section className="new-hero-section" ref={heroRef}>
        {/* Background Video Layers */}
        <div className="new-hero-bg-container">
          <motion.video 
            className="new-hero-video primary"
            autoPlay 
            muted 
            loop 
            playsInline
            style={{ y: heroY }}
          >
            <source src="/Bg-Cool1.mp4" type="video/mp4" />
          </motion.video>
          <motion.video 
            className="new-hero-video secondary"
            autoPlay 
            muted 
            loop 
            playsInline
            style={{ y: useTransform(scrollYProgress, [0, 1], ['10%', '60%']) }}
          >
            <source src="/Bg-Globe.mp4" type="video/mp4" />
          </motion.video>
          <div className="new-hero-overlay-complex"></div>
        </div>

        <motion.div 
          className="new-hero-container"
          style={{ opacity: heroOpacity }}
        >
          <div className="new-hero-content">
            {/* Dynamic Text Display */}
            <div className="new-hero-title-container">
              <motion.h1 className="new-hero-title-main">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 50, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -50, rotateX: -90 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="dynamic-text"
                  >
                    {heroTexts[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
                <br />
                <span className="new-gradient-text">with IA-Labs</span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="new-hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              We don't just build websites and software—we craft digital masterpieces that 
              revolutionize businesses and create lasting impact in the digital landscape.
            </motion.p>
            
            <motion.div 
              className="new-hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <Link 
                to="/contact" 
                className="new-cta-button primary"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Revolution
                  <span className="new-button-arrow">→</span>
                </motion.span>
              </Link>
              <Link 
                to="/about" 
                className="new-cta-button secondary"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discover Our Story
                </motion.span>
              </Link>
            </motion.div>
            
            <motion.div 
              className="new-hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.3 }}
            >
              {[
                { number: '100+', label: 'Digital Transformations', icon: '🚀' },
                { number: 'Premium', label: 'Express Delivery', icon: '⚡' },
                { number: '100%', label: 'Success Rate', icon: '🎯' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="new-stat"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="new-stat-icon">{stat.icon}</span>
                  <span className="new-stat-number">{stat.number}</span>
                  <span className="new-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced 3D Visual */}
          <motion.div 
            className="new-hero-visual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.8 }}
          >
            <div className="new-floating-dashboard">
              <div className="dashboard-glow-effect"></div>
              <div className="dashboard-screen">
                <div className="screen-header">
                  <div className="header-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <span className="screen-title">IA-Labs Console</span>
                  <div className="header-indicators">
                    <span className="indicator active"></span>
                    <span className="indicator"></span>
                    <span className="indicator"></span>
                  </div>
                </div>
                <div className="screen-content">
                  <div className="terminal-lines">
                    <div className="terminal-line">
                      <span className="prompt">$</span>
                      <span className="command">Initializing IA-Labs magic...</span>
                    </div>
                    <div className="terminal-line">
                      <span className="prompt">$</span>
                      <span className="command">Building revolutionary solution...</span>
                    </div>
                    <div className="terminal-line">
                      <span className="prompt">$</span>
                      <span className="command success">✓ Project launched successfully!</span>
                    </div>
                  </div>
                  <div className="metrics-display">
                    <div className="metric">
                      <span className="metric-label">Performance</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{width: '98%'}}></div>
                      </div>
                      <span className="metric-value">98%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Innovation</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{width: '100%'}}></div>
                      </div>
                      <span className="metric-value">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section with Video Backgrounds */}
      <section className="new-services-section" ref={servicesRef}>
        <div className="new-section-container">
          <motion.div 
            className="new-section-header"
            variants={containerVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
          >
            <motion.h2 className="new-services-title" variants={itemVariants}>
              Revolutionary <span className="new-gradient-text">Services</span>
            </motion.h2>
            <motion.p className="new-services-subtitle" variants={itemVariants}>
              Breakthrough solutions that redefine what's possible in the digital realm
            </motion.p>
          </motion.div>

          <motion.div 
            className="new-services-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            style={{ y: servicesY }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`new-service-card ${service.accent ? 'accent' : ''}`}
                variants={itemVariants}
                whileHover={{
                  y: -20,
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.4 }
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="service-video-bg">
                  <video autoPlay loop muted playsInline>
                    <source src={service.video} type="video/mp4" />
                  </video>
                  <div className="service-video-overlay"></div>
                </div>
                <div className="service-content">
                  <div className="service-icon-container">
                    <span className="service-icon">{service.icon}</span>
                    <div className="icon-glow"></div>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="service-feature"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="feature-check">✨</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Link to="/contact" className="service-cta">
                    <motion.span
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      Launch Project
                      <span className="cta-arrow">🚀</span>
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Advanced Animations */}
      <section className="new-features-section" ref={featuresRef}>
        <div className="features-bg-video">
          <video autoPlay loop muted playsInline>
            <source src="/pexels-jplenio-1103970.jpg" type="video/mp4" />
          </video>
          <div className="features-bg-overlay"></div>
        </div>
        
        <div className="new-section-container">
          <motion.div 
            className="new-section-header"
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            <motion.h2 className="new-features-title" variants={itemVariants}>
              Why Choose <span className="new-gradient-text">IA-Labs</span>
            </motion.h2>
            <motion.p className="new-features-subtitle" variants={itemVariants}>
              We don't just meet expectations—we obliterate them with innovation and excellence
            </motion.p>
          </motion.div>

          <motion.div 
            className="new-features-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="new-feature-card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  y: -15,
                  rotateY: 10,
                  transition: { duration: 0.4 }
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="feature-bg-glow" style={{ background: `radial-gradient(circle, ${feature.color}33, transparent)` }}></div>
                <div className="feature-icon-wrapper">
                  <span className="feature-icon" style={{ color: feature.color }}>{feature.icon}</span>
                  <div className="feature-icon-ring" style={{ borderColor: feature.color }}></div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-bottom-line" style={{ background: feature.color }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Dramatic Effects */}
      <section className="new-cta-section" ref={ctaRef}>
        <div className="cta-bg-container">
          <video autoPlay loop muted playsInline className="cta-bg-video">
            <source src="/3163534-uhd_3840_2160_30fps.mp4" type="video/mp4" />
          </video>
          <div className="cta-bg-overlay"></div>
        </div>
        
        <motion.div 
          className="new-cta-container"
          variants={containerVariants}
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
        >
          <motion.div className="new-cta-content" variants={itemVariants}>
            <h2 className="new-cta-title">
              Ready to Launch Your 
              <span className="new-gradient-text"> Digital Revolution?</span>
            </h2>
            <p className="new-cta-subtitle">
              Join the elite businesses that chose IA-Labs to transform their digital presence 
              into a competitive advantage that drives extraordinary results.
            </p>
            <div className="new-cta-buttons">
              <Link 
                to="/contact" 
                className="new-cta-button primary mega"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Begin Transformation
                  <span className="mega-arrow">🚀</span>
                </motion.span>
              </Link>
              <Link 
                to="/about" 
                className="new-cta-button secondary mega"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Universe
                </motion.span>
              </Link>
            </div>
            <div className="new-cta-final-stats">
              <div className="final-stat">
                <span className="final-stat-number">∞</span>
                <span className="final-stat-label">Possibilities</span>
              </div>
              <div className="final-stat">
                <span className="final-stat-number">24/7</span>
                <span className="final-stat-label">Elite Support</span>
              </div>
              <div className="final-stat">
                <span className="final-stat-number">Zero</span>
                <span className="final-stat-label">Compromises</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default NewHomePage;
