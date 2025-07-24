import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import './NewHomePage_Premium.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const NewHomePage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const navigate = useNavigate();
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Framer Motion hooks
  const isServicesInView = useInView(servicesRef, { once: true, threshold: 0.2 });
  const isFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.2 });
  const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.2 });

  // Hero background videos
  const heroVideos = [
    '/Bg-Cool1.mp4',
    '/Bg-Globe.mp4',
    '/3129595-uhd_3840_2160_30fps.mp4',
    '/3163534-uhd_3840_2160_30fps.mp4'
  ];

  // Typewriter texts
  const typewriterTexts = [
    'Build Your Digital Future',
    'Transform Your Business',
    'Scale Beyond Limits',
    'Innovation at Its Core'
  ];

  // Services data
  const services = [
    {
      icon: '🌐',
      title: 'Custom Websites',
      description: 'Beautiful, responsive websites that captivate your audience and drive conversions with cutting-edge technology.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern UI/UX'],
      accent: false
    },
    {
      icon: '⚡',
      title: 'SaaS Solutions',
      description: 'Powerful software as a service platforms to streamline your business operations and boost productivity.',
      features: ['Cloud-Based', 'Scalable Architecture', 'One-Time Payment', 'Premium Support'],
      accent: true
    },
    {
      icon: '🚀',
      title: 'Fast-Track Delivery',
      description: 'Need it fast? Our express service delivers your project in record time without compromising quality.',
      features: ['Premium Fast Delivery', 'Priority Support', 'Premium Features', '24/7 Monitoring'],
      accent: false
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
    }
  ];

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'homeParticle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  // Video rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentText = typewriterTexts[currentTextIndex];
      
      if (isDeleting) {
        setTypewriterText(currentText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        }
      } else {
        setTypewriterText(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      }
      
      timeout = setTimeout(type, isDeleting ? 50 : 100);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.homeHeroTitle', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );

      gsap.fromTo('.homeHeroSubtitle', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo('.homeHeroButtons', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo('.homeHeroStats', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
      );

      // Services section animations
      gsap.fromTo('.homeServiceCard', 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.homeServicesSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Features section animations
      gsap.fromTo('.homeFeatureCard', 
        { opacity: 0, x: -100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.homeFeaturesSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // CTA section animations
      gsap.fromTo('.homeCtaContent', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.homeCtaSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation for service icons
      gsap.to('.homeServiceIcon', {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Continuous subtle rotation for feature icons
      gsap.to('.homeFeatureIcon', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 3
      });

      // Gradient animation for section titles
      gsap.to('.homeGradientText', {
        backgroundPosition: '200% 0%',
        duration: 3,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="homeMainContainer" ref={heroRef}>
      {/* Floating Particles */}
      <div className="homeParticlesContainer" ref={particlesRef}></div>

      {/* Hero Section */}
      <section className="homeHeroSection">
        <div className="homeHeroBackground">
          {heroVideos.map((video, index) => (
            <video
              key={index}
              autoPlay
              loop
              muted
              playsInline
              className={`homeHeroVideo ${index === currentVideo ? 'homeVideoActive' : ''}`}
            >
              <source src={video} type="video/mp4" />
            </video>
          ))}
          <div className="homeHeroOverlay"></div>
        </div>
        
        <div className="homeHeroContent">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="homeHeroTextContainer"
          >
            <h1 className="homeHeroTitle">
              <div className="homeTypewriterLine">
                {typewriterText}
              </div>
              <div className="homeStaticLine">
                with&nbsp;<span className="homeGradientText">IA-Labs</span>
              </div>
            </h1>
            <p className="homeHeroSubtitle">
              We craft stunning websites and powerful SaaS solutions with one-time payments. 
              Choose our fast-track option for lightning-fast delivery and premium support.
            </p>
            
            <div className="homeHeroButtons">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="homePrimaryButton"
              >
                Start Your Project
                <span className="homeButtonArrow">→</span>
              </motion.button>
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="homeSecondaryButton"
              >
                Learn About Us
              </motion.button>
            </div>

            <div className="homeHeroStats">
              <div className="homeStat">
                <span className="homeStatNumber">50+</span>
                <span className="homeStatLabel">Projects Delivered</span>
              </div>
              <div className="homeStat">
                <span className="homeStatNumber">Premium</span>
                <span className="homeStatLabel">Fast-Track Delivery</span>
              </div>
              <div className="homeStat">
                <span className="homeStatNumber">100%</span>
                <span className="homeStatLabel">Client Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="homeServicesSection" ref={servicesRef}>
        <div className="homeSectionContainer">
          <motion.div 
            className="homeSectionHeader"
            initial={{ opacity: 0, y: 50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="homeSectionTitle">
              Our Premium <span className="homeGradientText">Services</span>
            </h2>
            <p className="homeSectionSubtitle">
              Transform your digital presence with our cutting-edge solutions designed for modern businesses
            </p>
          </motion.div>

          <div className="homeServicesGrid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`homeServiceCard ${service.accent ? 'homeServiceAccent' : ''}`}
                initial={{ opacity: 0, y: 100 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="homeServiceIcon">{service.icon}</div>
                <h3 className="homeServiceTitle">{service.title}</h3>
                <p className="homeServiceDescription">{service.description}</p>
                <ul className="homeServiceFeatures">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="homeServiceFeature">
                      <span className="homeFeatureCheck">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="homeServiceButton"
                >
                  Get Started
                  <span className="homeButtonArrow">→</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="homeFeaturesSection" ref={featuresRef}>
        <div className="homeSectionContainer">
          <motion.div 
            className="homeSectionHeader"
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="homeSectionTitle">
              Why Choose <span className="homeGradientText">IA-Labs</span>
            </h2>
            <p className="homeSectionSubtitle">
              We deliver exceptional results through innovation, expertise, and unwavering commitment to excellence
            </p>
          </motion.div>

          <div className="homeFeaturesGrid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="homeFeatureCard"
                initial={{ opacity: 0, x: -100 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="homeFeatureIcon">{feature.icon}</div>
                <h3 className="homeFeatureTitle">{feature.title}</h3>
                <p className="homeFeatureDescription">{feature.description}</p>
                <div className="homeFeatureBackground"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="homeCtaSection" ref={ctaRef}>
        <div className="homeSectionContainer">
          <motion.div
            className="homeCtaContent"
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="homeCtaTitle">
              Ready to Transform Your 
              <span className="homeGradientText"> Digital Presence?</span>
            </h2>
            <p className="homeCtaSubtitle">
              Join the growing number of businesses that trust IA-Labs to deliver 
              exceptional digital solutions that drive real results.
            </p>
            <div className="homeCtaButtons">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="homePrimaryButton homeLargeButton"
              >
                Start Your Project Today
                <span className="homeButtonArrow">→</span>
              </motion.button>
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="homeSecondaryButton homeLargeButton"
              >
                Learn More About Us
              </motion.button>
            </div>
            <div className="homeCtaStats">
              <div className="homeCtaStat">
                <span className="homeStatNumber">24/7</span>
                <span className="homeStatLabel">Premium Support</span>
              </div>
              <div className="homeCtaStat">
                <span className="homeStatNumber">Fast</span>
                <span className="homeStatLabel">Delivery Available</span>
              </div>
              <div className="homeCtaStat">
                <span className="homeStatNumber">One-Time</span>
                <span className="homeStatLabel">Payment Options</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewHomePage;
