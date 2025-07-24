import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NewServicesPage.css';

gsap.registerPlugin(ScrollTrigger);

const NewServicesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const tier1Ref = useRef(null);
  const tier2Ref = useRef(null);
  const tier3Ref = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);

  // Framer Motion hooks
  const isTier1InView = useInView(tier1Ref, { once: true, threshold: 0.1 });
  const isTier2InView = useInView(tier2Ref, { once: true, threshold: 0.1 });
  const isTier3InView = useInView(tier3Ref, { once: true, threshold: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    // Create floating particles exactly like Contact page
    const createStarParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      // Clear existing particles first
      container.innerHTML = '';

      // Create 40 particles for balanced visibility
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'servicesStarParticle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        // Larger, more visible stars
        const size = Math.random() * 3 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
      }
    };

    // GSAP animations with ScrollTriggers
    if (typeof window !== 'undefined') {
      // Hero animations
      gsap.set('.services-hero-title', { y: 50, opacity: 0 });
      gsap.set('.services-hero-subtitle', { y: 30, opacity: 0 });

      gsap.to('.services-hero-title', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
      });

      gsap.to('.services-hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: 'power2.out'
      });

      // Tier 1 ScrollTrigger animations
      gsap.fromTo('.services-tier1-header', 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tier1Ref.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.services-tier1-packages .services-package-card', 
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tier1Ref.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Tier 2 ScrollTrigger animations
      gsap.fromTo('.services-tier2-header', 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tier2Ref.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.services-tier2-packages .services-package-card', 
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tier2Ref.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Tier 3 ScrollTrigger animations
      gsap.fromTo('.services-tier3-header', 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tier3Ref.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.services-tier3-special', 
        { opacity: 0, y: 50, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tier3Ref.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    createStarParticles();
    setIsLoaded(true);

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const tier1Packages = [
    {
      id: 'catalyst',
      name: "The 'Catalyst' Website",
      price: "$1,200",
      description: "The 'Catalyst' package is designed for businesses seeking a visually impactful online presence that makes a strong statement without the need for complex interactive features or backend integrations.",
      features: [
        "Beautifully designed, desktop-first website with engaging visuals",
        "Dynamic Framer Motion and GSAP animations",
        "Fully responsive across all devices",
        "Up to 6 expertly crafted pages",
        "No contact form or backend integration"
      ],
      maintenance: "$40 USD/month (Optional)",
      idealFor: "Businesses, freelancers, or individuals looking for a sophisticated online portfolio or brand showcase."
    },
    {
      id: 'ascendant',
      name: "The 'Ascendant' Website", 
      price: "$2,000",
      description: "Building upon the solid foundation of the 'Catalyst' package, the 'Ascendant' website elevates your online capabilities by incorporating essential interactive and communicative features.",
      features: [
        "All Catalyst features included",
        "Enhanced with 10 total pages",
        "Functional contact form integration",
        "Nodemailer integration for email notifications",
        "Streamlined lead management process"
      ],
      maintenance: "$60 USD/month (Optional)",
      idealFor: "Growing businesses, startups, or service providers who need robust online presence for lead generation."
    },
    {
      id: 'velocity',
      name: "The 'Velocity' Website",
      price: "Pricing Upon Request",
      description: "For clients operating under tight deadlines or seeking the swiftest path to a sophisticated digital launch, the 'Velocity' package offers unparalleled speed without compromise.",
      features: [
        "All Ascendant features included",
        "10 pages with full functionality", 
        "Complete contact form and Nodemailer integration",
        "Guaranteed delivery within 3 days",
        "Premium priority support"
      ],
      maintenance: "$60 USD/month (Optional)",
      idealFor: "Businesses with critical launch dates, time-sensitive marketing campaigns, or those requiring rapid deployment."
    }
  ];

  const tier2Solutions = [
    {
      id: 'finance-inventory',
      name: "Integrated Finance & Inventory Management System",
      price: "$5,000",
      description: "Navigate the complexities of your business finances and inventory with unparalleled clarity and predictive power.",
      features: [
        "Comprehensive financial tracking with AI integration",
        "Real-time cash flow and burn rate analysis", 
        "Detailed inventory management and control",
        "Automated low stock alerts and reporting",
        "Built-in ROI Calculator and business intelligence"
      ],
      maintenance: "$100/month or $1,000/year (Optional)",
      idealFor: "Retail, wholesale, manufacturing, and distribution sectors looking to optimize operations."
    },
    {
      id: 'crm-platform',
      name: "Comprehensive CRM Platform",
      price: "$7,000", 
      description: "Forge deeper, more meaningful relationships with your customers through a powerful CRM platform that adapts to your unique business processes.",
      features: [
        "Role-based admin panel with tailored access",
        "Customizable customer journey workflows",
        "Advanced analytics and reporting dashboard",
        "Automated email marketing campaigns",
        "Integration with popular third-party services"
      ],
      maintenance: "$120/month or $1,200/year (Optional)",
      idealFor: "Service-based businesses, consultancies, and companies focused on customer relationship management."
    }
  ];

  // Component for Package Cards
  const PackageCard = ({ package: pkg, index }) => (
    <div className="services-package-card">
      <div className="services-package-content">
        <div className="services-package-header">
          <h4 className="services-package-name">{pkg.name}</h4>
          <div className="services-package-price">{pkg.price}</div>
        </div>
        
        <p className="services-package-description">{pkg.description}</p>
        
        <ul className="services-package-features">
          {pkg.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        
        <div className="services-package-details">
          <p><span className="label">Maintenance:</span> {pkg.maintenance}</p>
          <p><span className="label">Ideal for:</span> {pkg.idealFor}</p>
        </div>
      </div>

      {/* Simple Contact Section */}
      <div className="services-contact-section">
        <a 
          href="https://wa.me/923238507347" 
          target="_blank" 
          rel="noopener noreferrer"
          className="services-contact-button"
        >
          Contact Us
        </a>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="services-main-container">
      {/* Floating Particles */}
      <motion.div 
        className="servicesParticlesContainer" 
        ref={particlesRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      ></motion.div>

      {/* Enhanced Hero Section */}
      <section className="services-hero-section" ref={heroRef}>
        <div className="services-hero-background">
          <video
            className="services-hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/7101913-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="services-hero-overlay"></div>
        </div>
        
        <div className="services-hero-content">
          <h1 className="services-hero-title">
            Our Premium <span className="services-gradient-text">Services</span>
          </h1>
          <p className="services-hero-subtitle">
            Unleash your digital potential with our comprehensive suite of cutting-edge solutions. 
            From stunning websites to powerful SaaS platforms, we deliver excellence that drives business growth.
          </p>
        </div>
      </section>

      {/* Enhanced Tier 1 Section */}
      <section className="services-tier-section" ref={tier1Ref}>
        <div className="services-tier-container">
          <motion.div
            className="services-tier-header services-tier1-header"
            initial={{ opacity: 0, y: 30 }}
            animate={isTier1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="services-tier-number">TIER 1</h2>
            <h3 className="services-tier-title">Bespoke Web Solutions</h3>
            <p className="services-tier-description">
              Professional websites that make powerful first impressions and drive business growth
            </p>
          </motion.div>

          <div className="services-packages-grid services-tier1-packages">
            {tier1Packages.map((pkg, index) => (
              <PackageCard key={pkg.id} package={pkg} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Tier 2 Section */}
      <section className="services-tier-section" ref={tier2Ref}>
        <div className="services-tier-container">
          <motion.div
            className="services-tier-header services-tier2-header"
            initial={{ opacity: 0, y: 30 }}
            animate={isTier2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="services-tier-number">TIER 2</h2>
            <h3 className="services-tier-title">Advanced SaaS Platforms</h3>
            <p className="services-tier-description">
              Comprehensive business management systems designed to optimize operations and drive growth
            </p>
          </motion.div>

          <div className="services-packages-grid services-tier2-packages">
            {tier2Solutions.map((solution, index) => (
              <PackageCard key={solution.id} package={solution} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Tier 3 Section */}
      <section className="services-tier-section" ref={tier3Ref}>
        <div className="services-tier-container">
          <motion.div
            className="services-tier-header services-tier3-header"
            initial={{ opacity: 0, y: 30 }}
            animate={isTier3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="services-tier-number">TIER 3</h2>
            <h3 className="services-tier-title">The Full Spectrum Synergy</h3>
          </motion.div>
          
          <motion.div
            className="services-tier3-special"
            initial={{ opacity: 0, y: 30 }}
            animate={isTier3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="services-tier3-title">Unleash Your Full Potential</h4>
            <p className="services-tier3-description">
              Tier 3 represents the pinnacle of IA-Labs' service offerings, a comprehensive package designed for businesses seeking complete digital dominance. This tier seamlessly integrates the visually stunning and high-performance web development solutions from Tier 1 with the powerful, bespoke SaaS platforms of Tier 2.
            </p>
            <p className="services-tier3-subdescription">
              Whether you're a large enterprise or an ambitious project aiming for complete digital transformation, Tier 3 provides the tools and expertise you need to succeed. From captivating front-end user experiences to robust back-end operational efficiency, we ensure seamless integration and unparalleled potential.
            </p>
            
            <div className="services-tier3-contact">
              <a 
                href="https://wa.me/923238507347" 
                target="_blank" 
                rel="noopener noreferrer"
                className="services-tier3-contact-button"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="services-cta-section" ref={ctaRef}>
        <div className="services-cta-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="services-cta-title">Ready to Transform Your Business?</h2>
            <p className="services-cta-description">
              Connect with our expert team to discuss your unique requirements and discover the perfect solution for your business.
            </p>
            
            <div className="services-cta-buttons">
              <a 
                href="https://wa.me/923238507347" 
                target="_blank" 
                rel="noopener noreferrer"
                className="services-cta-button"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewServicesPage;
