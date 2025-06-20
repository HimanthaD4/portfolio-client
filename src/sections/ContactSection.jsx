import React, { useState } from 'react';
import { FaPaperPlane, FaPhone, FaLightbulb, FaRocket, FaMagic, FaExclamationCircle, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  {
    icon: <FaLightbulb />,
    title: 'Share Idea',
    description: 'No limits, just possibilities',
  },
  {
    icon: <FaRocket />,
    title: 'Quick Chat',
    description: 'Let\'s make it happen',
  },
  {
    icon: <FaMagic />,
    title: 'Brainstorm',
    description: 'Creative collisions',
  }
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCard, setActiveCard] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address';
    }
    
    if (name === 'phone' && value && !/^[\d\s+\-()]{10,20}$/.test(value)) {
      error = 'Please enter a valid phone number';
    }
    
    if (name === 'message' && value.length < 10) {
      error = 'Message should be at least 10 characters';
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const errors = {
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message)
    };
    
    setFormErrors(errors);
    
    return !formData.email || !formData.message || 
           errors.email || errors.phone || errors.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/contact`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData({
          email: '',
          phone: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(response.data.message || 'Failed to send message');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        #contact {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(to top, #0f172a, #1e293b);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0rem 3rem;
          position: relative;
          overflow: hidden;
          margin-bottom: 2rem; /* Add this line */
        }

        .contact-wrapper {
          max-width: 600px;
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 1rem;
        }

        .section-header h2 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #f97316, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .section-header p {
          color: #cbd5e1;
          font-size: 0.9rem;
          margin: 0;
          max-width: 400px;
        }

        .card-grid {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin: 1.2rem 0;
        }

        .card {
          width: 80px;
          height: 80px;
          perspective: 1000px;
          cursor: pointer;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
          position: relative;
          transform: ${activeCard !== null ? 'rotateY(180deg)' : 'none'};
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0.5rem;
          text-align: center;
          box-sizing: border-box;
        }

        .card-front {
          font-size: 1.4rem;
          color: #f97316;
          background: rgba(15,23,42,0.6);
          border: 1px solid rgba(249, 115, 22, 0.2);
        }

        .card-back {
          transform: rotateY(180deg);
          color: #e2e8f0;
          font-size: 0.6rem;
          background: rgba(249, 115, 22, 0.1);
          line-height: 1.2;
          backdrop-filter: blur(3px);
          border: 1px solid rgba(249, 115, 22, 0.1);
        }

        form {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          width: 100%;
          max-width: 400px;
        }

        .form-group {
          width: 100%;
          position: relative;
        }

        input, textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(15, 23, 42, 0.7);
          color: #e2e8f0;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        input::placeholder, textarea::placeholder {
          color: #94a3b8;
          opacity: 0.7;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
          background: rgba(15, 23, 42, 0.9);
        }

        textarea {
          resize: none;
          min-height: 120px;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .success-message {
          color: #22c55e;
          font-size: 0.75rem;
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        button {
          margin-top: 0.3rem;
          padding: 0.8rem 1.8rem;
          background: linear-gradient(to right, #f97316, #f59e0b);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-size: 0.95rem;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        .feedback {
          margin-top: 0.6rem;
          font-size: 0.85rem;
          text-align: center;
          min-height: 20px;
        }

        .success {
          color: #22c55e;
          font-weight: 600;
        }

        .error {
          color: #ef4444;
          font-weight: 500;
        }

        .loading-spinner {
          display: inline-block;
          width: 0.9rem;
          height: 0.9rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #0f172a;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .idea-bubble {
          position: absolute;
          background: rgba(249, 115, 22, 0.05);
          border-radius: 50%;
          filter: blur(10px);
          z-index: 1;
        }

        .input-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #f97316;
          font-size: 0.8rem;
        }

        @media (max-width: 480px) {
          .contact-wrapper {
            padding: 1.5rem 1rem;
          }
          
          .card {
            width: 70px;
            height: 70px;
          }
          
          .card-front {
            font-size: 1.2rem;
          }
          
          .card-back {
            font-size: 0.55rem;
            padding: 0.4rem;
          }
          
          input, textarea {
            padding: 0.7rem;
            font-size: 0.85rem;
          }
          
          button {
            padding: 0.7rem 1.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>

      {/* Animated idea bubbles in background */}
      <motion.div 
        className="idea-bubble"
        initial={{ width: 100, height: 100, x: -50, y: -50 }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          transition: { duration: 15, repeat: Infinity, repeatType: "reverse" }
        }}
        style={{ top: '20%', left: '10%' }}
      />
      <motion.div 
        className="idea-bubble"
        initial={{ width: 150, height: 150, x: 0, y: 0 }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
          transition: { duration: 20, repeat: Infinity, repeatType: "reverse" }
        }}
        style={{ bottom: '15%', right: '10%' }}
      />
      <motion.div 
        className="idea-bubble"
        initial={{ width: 80, height: 80, x: 0, y: 0 }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 30, 0],
          transition: { duration: 18, repeat: Infinity, repeatType: "reverse" }
        }}
        style={{ top: '60%', left: '20%' }}
      />

      <section id="contact">
        <div className="contact-wrapper">
          <div className="section-header">
            <h2>Share Your Idea Freely</h2>
            <p>No formalities, just your brilliant thoughts</p>
          </div>

          <div className="card-grid">
            {cards.map((card, index) => (
              <div 
                className="card" 
                key={index}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="card-inner">
                  <div className="card-front">{card.icon}</div>
                  <div className="card-back">
                    {card.title}
                    <div style={{ marginTop: '4px', opacity: 0.9 }}>
                      {card.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Your email (so I can reply)" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <AnimatePresence>
                {formErrors.email && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaExclamationCircle size={12} /> {formErrors.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="form-group">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone (optional, if you prefer calls)" 
                value={formData.phone}
                onChange={handleChange}
              />
              <AnimatePresence>
                {formErrors.phone && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaExclamationCircle size={12} /> {formErrors.phone}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Pour out your idea here... no limits!" 
                value={formData.message}
                onChange={handleChange}
                required 
              />
              <AnimatePresence>
                {formErrors.message ? (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaExclamationCircle size={12} /> {formErrors.message}
                  </motion.div>
                ) : formData.message.length > 10 && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaCheck size={12} /> Looks good!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button type="submit" disabled={loading || Object.values(formErrors).some(err => err)}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span> Sending...
                </>
              ) : submitted ? (
                <>
                  Idea Shared! <FaPaperPlane />
                </>
              ) : (
                <>
                  Launch Idea <FaPaperPlane />
                </>
              )}
            </button>
            
            <div className="feedback">
              {submitted && (
                <motion.div
                  className="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Your idea is on its way!
                </motion.div>
              )}
              {error && (
                <motion.div
                  className="error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FaExclamationCircle /> {error}
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactSection;