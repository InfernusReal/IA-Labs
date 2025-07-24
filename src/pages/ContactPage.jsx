import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactPage.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Refs for animations
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const particlesRef = useRef(null);
  const contactInfoRef = useRef(null);

  // Framer Motion hooks
  const isFormInView = useInView(formRef, { once: true, threshold: 0.2 });
  const isContactInfoInView = useInView(contactInfoRef, { once: true, threshold: 0.2 });

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'contactParticle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.contactHeroTitle', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );

      gsap.fromTo('.contactHeroSubtitle', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      // Form animations
      gsap.fromTo('.contactFormContainer', 
        { opacity: 0, x: -100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contactFormSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact info animations
      gsap.fromTo('.contactInfoCard', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contactInfoSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('validation_error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: '',
          message: '',
          budget: ''
        });
        // Auto-clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        console.error('Server error:', result.message);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('network_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '�',
      title: 'Free Consultation',
      info: '30-min Strategy Call',
      description: 'Discuss your project goals and get expert advice'
    },
    {
      icon: '�',
      title: 'Custom Solutions',
      info: 'Tailored Development',
      description: 'Built specifically for your business needs'
    },
    {
      icon: '⚡',
      title: 'Quick Response',
      info: '< 24 Hours',
      description: 'We respond to all inquiries within 24 hours'
    },
    {
      icon: '🎯',
      title: 'Expert Team',
      info: 'Full-Stack Developers',
      description: 'Specialized in modern web technologies'
    }
  ];

  return (
    <div className="contactMainContainer" ref={heroRef}>
      {/* Floating Particles */}
      <div className="contactParticlesContainer" ref={particlesRef}></div>

      {/* Hero Section */}
      <section className="contactHeroSection">
        <div className="contactHeroBackground">
          <video autoPlay loop muted playsInline className="contactHeroVideo">
            <source src="/3163534-uhd_3840_2160_30fps.mp4" type="video/mp4" />
          </video>
          <div className="contactHeroOverlay"></div>
        </div>
        
        <div className="contactHeroContent">
          <h1 className="contactHeroTitle">
            Get Your Free <span className="contactGradientText">Consultation</span> Today
          </h1>
          <p className="contactHeroSubtitle">
            Ready to transform your business with custom web solutions? Schedule a consultation 
            or request a tailored solution for your specific needs. Our experts are here to help.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="contactFormSection">
        <div className="contactFormContainer">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="contactFormCard"
          >
            <h2 className="contactFormTitle">Request Consultation or Custom Solution</h2>
            <p className="contactFormSubtitle">Tell us about your business needs and we'll provide expert guidance</p>
            
            <form onSubmit={handleSubmit} className="contactForm">
              <div className="contactFormRow">
                <div className="contactFormGroup">
                  <label htmlFor="name" className="contactFormLabel">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="contactFormInput"
                    placeholder="John Doe"
                  />
                </div>
                <div className="contactFormGroup">
                  <label htmlFor="email" className="contactFormLabel">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="contactFormInput"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="contactFormRow">
                <div className="contactFormGroup">
                  <label htmlFor="company" className="contactFormLabel">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="contactFormInput"
                    placeholder="Your Company"
                  />
                </div>
                <div className="contactFormGroup">
                  <label htmlFor="phone" className="contactFormLabel">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="contactFormInput"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="contactFormRow">
                <div className="contactFormGroup">
                  <label htmlFor="inquiryType" className="contactFormLabel">What do you need? *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                    className="contactFormSelect"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="custom-website">Custom Website Solution</option>
                    <option value="custom-saas">Custom SaaS Solution</option>
                    <option value="business-problem">Solve a Business Problem</option>
                    <option value="website-redesign">Website Redesign/Optimization</option>
                    <option value="other">Other Custom Solution</option>
                  </select>
                </div>
                <div className="contactFormGroup">
                  <label htmlFor="budget" className="contactFormLabel">Budget Range (Optional)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="contactFormSelect"
                  >
                    <option value="">Select budget range</option>
                    <option value="consultation-only">Just Consultation</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>
              </div>

              <div className="contactFormGroup">
                <label htmlFor="message" className="contactFormLabel">Business Challenge or Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="contactFormTextarea"
                  placeholder="Describe your business challenge, goals, or the custom solution you need. The more details you provide, the better we can help you."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`contactFormButton ${isSubmitting ? 'contactFormButtonLoading' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
                <span className="contactFormButtonIcon">→</span>
              </motion.button>

              {submitStatus === 'success' && (
                <div className="contactFormSuccess">
                  ✅ Thank you! Your request has been sent successfully. We'll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'validation_error' && (
                <div className="contactFormError">
                  ⚠️ Please fill in all required fields (Name, Email, and Message).
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="contactFormError">
                  ❌ Something went wrong on our server. Please try again or contact us directly.
                </div>
              )}

              {submitStatus === 'network_error' && (
                <div className="contactFormError">
                  🌐 Network error occurred. Please check your connection and try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section ref={contactInfoRef} className="contactInfoSection">
        <div className="contactInfoContainer">
          <div className="contactInfoHeader">
            <h2 className="contactInfoTitle">Why Choose IA-Labs?</h2>
            <p className="contactInfoSubtitle">
              We're not just developers—we're your digital transformation partners
            </p>
          </div>
          
          <div className="contactInfoGrid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isContactInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="contactInfoCard"
              >
                <div className="contactInfoIcon">{info.icon}</div>
                <h3 className="contactInfoCardTitle">{info.title}</h3>
                <p className="contactInfoCardInfo">{info.info}</p>
                <p className="contactInfoCardDesc">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
