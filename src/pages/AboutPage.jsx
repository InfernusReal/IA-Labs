import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [logoTheme, setLogoTheme] = useState('dark');
  const navigate = useNavigate();
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Framer Motion hooks
  const isStoryInView = useInView(storyRef, { once: true, threshold: 0.2 });
  const isServicesInView = useInView(servicesRef, { once: true, threshold: 0.2 });
  const isProcessInView = useInView(processRef, { once: true, threshold: 0.2 });
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
    'Crafting Digital Masterpieces',
    'Innovation at Its Finest',
    'Premium SaaS Solutions',
    'Web Development Excellence'
  ];

  // Services data
  const services = [
    {
      icon: '🎨',
      title: 'Premium Web Design',
      description: 'Stunning, responsive websites that captivate your audience and drive conversions with cutting-edge design principles.',
      features: ['Custom UI/UX', 'Mobile-First Design', 'SEO Optimized', 'Performance Focused']
    },
    {
      icon: '⚙️',
      title: 'SaaS Development',
      description: 'Scalable software solutions that grow with your business, built with modern technologies and best practices.',
      features: ['Cloud Architecture', 'API Integration', 'Database Design', 'Security First']
    },
    {
      icon: '🚀',
      title: 'Fast-Track Delivery',
      description: 'Express development service that delivers exceptional results in record time without compromising quality.',
      features: ['48-72 Hour Delivery', 'Priority Support', 'Agile Process', 'Quality Assured']
    }
  ];

  // Process data
  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'Deep dive into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Craft stunning visual designs and robust technical architecture that ensures scalability and performance.',
      icon: '🎨'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Build with cutting-edge technologies and implement rigorous testing to ensure bug-free, high-quality deliverables.',
      icon: '⚙️'
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Seamless deployment with comprehensive support, monitoring, and ongoing optimization for peak performance.',
      icon: '🚀'
    }
  ];

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'aboutParticle';
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

  // Theme detection
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setLogoTheme(theme);
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setLogoTheme(newTheme);
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.aboutHeroTitle', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );

      gsap.fromTo('.aboutHeroSubtitle', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo('.aboutHeroButtons', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      );

      // Story section animations
      gsap.fromTo('.aboutStoryCard', 
        { opacity: 0, x: -100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.aboutStorySection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Services cards animation
      gsap.fromTo('.aboutExpertiseCard', 
        { opacity: 0, y: 100, rotation: 5 },
        { 
          opacity: 1, 
          y: 0, 
          rotation: 0,
          duration: 1.5, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.aboutServicesSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Process timeline animation
      gsap.fromTo('.aboutWorkflowStep', 
        { opacity: 0, x: (index) => index % 2 === 0 ? -150 : 150 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.5, 
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.aboutProcessSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation for story image
      gsap.to('.aboutStoryImage', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      // Continuous rotation for expertise icons
      gsap.to('.aboutExpertiseIcon', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 2
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="aboutMainContainer" ref={heroRef}>
      {/* Floating Particles */}
      <div className="aboutParticlesContainer" ref={particlesRef}></div>

      {/* Hero Section */}
      <section className="aboutHeroSection">
        <div className="aboutHeroBackground">
          {heroVideos.map((video, index) => (
            <video
              key={index}
              autoPlay
              loop
              muted
              playsInline
              className={`aboutHeroVideo ${index === currentVideo ? 'aboutVideoActive' : ''}`}
            >
              <source src={video} type="video/mp4" />
            </video>
          ))}
          <div className="aboutHeroOverlay"></div>
        </div>
        
        <div className="aboutHeroContent">
          <img 
            src={logoTheme === 'dark' ? '/IA-Labs-Logo-Dark (1).png' : '/IA-Labs-Logo-Light (1).png'} 
            alt="IA-Labs" 
            className="aboutLogoMain"
          />
          <h1 className="aboutHeroTitle">
            Where <span className="aboutGradientText">Innovation</span> Meets <span className="aboutGradientText">Excellence</span>
          </h1>
          <div className="aboutTypewriterContainer">
            <span className="aboutTypewriterText">{typewriterText}</span>
            <span className="aboutTypewriterCursor">|</span>
          </div>
          <p className="aboutHeroSubtitle">
            We are IA-Labs, a premium digital agency that transforms visionary ideas into exceptional 
            digital experiences. Our elite team of developers and designers craft cutting-edge 
            web solutions and SaaS platforms that accelerate business growth and drive innovation.
          </p>
          <div className="aboutHeroButtons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aboutCtaButton aboutCtaPrimary"
              onClick={() => navigate('/services')}
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aboutCtaButton aboutCtaSecondary"
              onClick={() => navigate('/contact')}
            >
              Schedule Consultation
            </motion.button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="aboutStorySection">
        <div className="aboutStoryContainer">
          <div className="aboutStoryHeader">
            <h2 className="aboutSectionTitle">Our Journey</h2>
            <p className="aboutSectionSubtitle">
              Building the future of digital experiences, one project at a time
            </p>
          </div>
          
          <div className="aboutStoryGrid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="aboutStoryCard"
            >
              <h3 className="aboutStoryCardTitle">Our Mission</h3>
              <p className="aboutStoryCardDesc">
                Founded with a vision to revolutionize digital experiences, IA-Labs has evolved 
                from a passionate startup to a leading digital agency. We believe exceptional 
                technology should be accessible, beautiful, and transformative.
              </p>
              <p className="aboutStoryCardDesc">
                Our approach combines bleeding-edge technology with human-centered design, 
                delivering solutions that don't just look stunning but drive measurable results.
              </p>
              <div className="aboutStoryHighlights">
                <div className="aboutHighlightItem">
                  <span className="aboutHighlightIcon">🎯</span>
                  <span className="aboutHighlightText">Mission-Driven Development</span>
                </div>
                <div className="aboutHighlightItem">
                  <span className="aboutHighlightIcon">⚡</span>
                  <span className="aboutHighlightText">Lightning-Fast Delivery</span>
                </div>
                <div className="aboutHighlightItem">
                  <span className="aboutHighlightIcon">🔧</span>
                  <span className="aboutHighlightText">Cutting-Edge Technology</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aboutStoryVisual aboutMockupVisual"
            >
              <div className="aboutStoryImageContainer">
                <img 
                  src="/mockups/Screenshot 2025-07-04 062304-side (1).png" 
                  alt="IA-Labs TV Mockup" 
                  className="aboutStoryImage"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="aboutServicesSection">
        <div className="aboutServicesContainer">
          <div className="aboutServicesHeader">
            <h2 className="aboutSectionTitle">Our Expertise</h2>
            <p className="aboutSectionSubtitle">
              Premium services engineered to accelerate your digital transformation
            </p>
          </div>
          
          <div className="aboutExpertiseGrid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="aboutExpertiseCard"
              >
                <div className="aboutExpertiseIcon">{service.icon}</div>
                <h3 className="aboutExpertiseTitle">{service.title}</h3>
                <p className="aboutExpertiseDesc">{service.description}</p>
                <ul className="aboutExpertiseFeatures">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="aboutExpertiseFeature">{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="aboutProcessSection">
        <div className="aboutProcessContainer">
          <div className="aboutProcessHeader">
            <h2 className="aboutSectionTitle">Our Process</h2>
            <p className="aboutSectionSubtitle">
              A proven methodology that consistently delivers exceptional results
            </p>
          </div>
          
          <div className="aboutWorkflowContainer">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`aboutWorkflowStep ${index % 2 === 0 ? 'aboutWorkflowLeft' : 'aboutWorkflowRight'}`}
              >
                <div className="aboutWorkflowNumber">{step.step}</div>
                <div className="aboutWorkflowContent">
                  <div className="aboutWorkflowIcon">{step.icon}</div>
                  <h3 className="aboutWorkflowTitle">{step.title}</h3>
                  <p className="aboutWorkflowDesc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="aboutCtaSection">
        <div className="aboutCtaBackground">
          <video autoPlay loop muted playsInline className="aboutCtaVideo">
            <source src="/7101913-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="aboutCtaOverlay"></div>
        </div>
        
        <div className="aboutCtaContainer">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aboutCtaContent"
          >
            <h2 className="aboutCtaTitle">Ready to Transform Your Vision?</h2>
            <p className="aboutCtaSubtitle">
              Join hundreds of satisfied clients who've accelerated their growth with IA-Labs. 
              Let's create something extraordinary together and push the boundaries of what's possible.
            </p>
            <div className="aboutCtaButtons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="aboutCtaButton aboutCtaPrimary aboutCtaLarge"
                onClick={() => navigate('/services')}
              >
                Start Your Project Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="aboutCtaButton aboutCtaSecondary aboutCtaLarge"
                onClick={() => navigate('/contact')}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
