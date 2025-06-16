import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaChevronDown, FaArrowRight, FaCode, FaTools } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';
import HeroImage from '../components/himantha-cartoon.png'; // Your PNG image

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const controls = useAnimation();
  const imageRef = useRef();
  const socialRefs = useRef([]);
  const techIconsRef = useRef([]);

  const roles = [
    "Himantha Hirushan",
    "Full Stack Developer",
    "Software Engineer",
    "ML Specialist",
  ];

  const techIcons = [
    { icon: <FaCode />, name: "React" },
    { icon: <FaCode />, name: "Node.js" },
    { icon: <FaCode />, name: "Python" },
    { icon: <FaTools />, name: "TensorFlow" },
  ];

  // Typing animation
  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];
      
      setTypedText(isDeleting 
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1)
      );
      
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 80 : 150);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  // Entrance animations
  useEffect(() => {
    const sequence = async () => {
      // Text elements enter
      await controls.start("visible");

      // Image slides in with tech icons
      if (imageRef.current) {
        imageRef.current.style.opacity = "1";
        imageRef.current.style.transform = "translateY(0) rotate(0deg)";
        
        // Animate tech icons around image
        techIconsRef.current.forEach((icon, i) => {
          if (icon) {
            setTimeout(() => {
              icon.style.transform = "translate(0, 0) scale(1)";
              icon.style.opacity = "1";
            }, i * 150 + 500);
          }
        });
      }

      // Social icons drop in
      socialRefs.current.forEach((ref, i) => {
        if (ref) {
          setTimeout(() => {
            ref.style.transform = "translateY(0)";
            ref.style.opacity = "1";
          }, i * 100 + 800);
        }
      });
    };

    sequence();
  }, []);

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 2rem 80px',
        background: 'radial-gradient(ellipse at top right, #1e293b, #0f172a)',
      }}
    >
      {/* Decorative glow elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }} 
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }} 
      />
      
      {/* Content Container */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '2rem',
      }}>
        {/* Text Content (Left Side) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.6, -0.05, 0.01, 0.99] 
              }
            }
          }}
          style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '600px',
            padding: '0 1rem',
          }}
        >
          <motion.h1 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '1rem',
              lineHeight: 1.15,
            }}
          >
            Hi, I'm <span style={{ 
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}> 
            {typedText}
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '4.2rem',
              marginLeft: '4px',
              background: '#f97316',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s infinite',
            }}></span>
          </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '1.1rem',
              color: '#cbd5e1',
              maxWidth: '500px',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
            }}
          >
            Crafting digital experiences that blend innovation with intuitive design.
          </motion.p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="projects"
                smooth={true}
                duration={700}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(249, 115, 22, 0.35)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Discover My Work <FaArrowRight />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="contact"
                smooth={true}
                duration={700}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  border: '2px solid rgba(249, 115, 22, 0.4)',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Let's Build Together <FaArrowRight />
              </Link>
            </motion.div>
          </div>
          
          {/* Social Links */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            position: 'relative',
            height: '50px',
          }}>
            {[
              { icon: <FaGithub />, url: 'https://github.com/HimanthaD4', label: 'GitHub' },
              { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/himantha-hirushan-390122212/', label: 'LinkedIn' },
              { icon: <FaFacebook />, url: 'https://web.facebook.com/himantha.hirushan.71', label: 'Facebook' },
              { icon: <FaWhatsapp />, url: 'https://wa.me/94768840107', label: 'WhatsApp' }
            ].map((social, index) => (
              <a 
                key={index}
                ref={el => socialRefs.current[index] = el}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#94a3b8',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  left: 0,
                  top: 0,
                  opacity: 0,
                  transform: 'translateY(-100px)',
                }}
                onMouseEnter={e => {
                  e.target.style.color = '#f97316';
                  e.target.style.backgroundColor = 'rgba(249, 115, 22, 0.15)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.3)';
                  e.target.style.transform = 'translateY(-5px) scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.target.style.color = '#94a3b8';
                  e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
        
        {/* Image Container (Right Side) */}
        <motion.div 
          style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '400px',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <motion.div
            ref={imageRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '350px',
              opacity: 0,
              transform: 'translateY(50px) rotate(-5deg)',
              transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.8
            }}
          >
            <motion.img 
              src={HeroImage} 
              alt="Himantha Hirushan" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            />
            
            {/* Technology icons floating around */}
            {techIcons.map((tech, index) => {
              const positions = [
                { top: '-10%', left: '20%' },
                { top: '20%', right: '-10%' },
                { bottom: '10%', left: '-10%' },
                { bottom: '-10%', right: '20%' },
              ];
              
              return (
                <motion.div
                  key={index}
                  ref={el => techIconsRef.current[index] = el}
                  style={{
                    position: 'absolute',
                    ...positions[index],
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f97316',
                    fontSize: '1.2rem',
                    opacity: 0,
                    transform: 'scale(0)',
                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    zIndex: 3,
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1 + index * 0.2
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(249, 115, 22, 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {tech.icon}
                  <motion.span
                    style={{
                      position: 'absolute',
                      bottom: '-25px',
                      fontSize: '0.7rem',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {tech.name}
                  </motion.span>
                </motion.div>
              );
            })}
            
            {/* Perfect glow effect */}
            <div 
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                right: '10%',
                height: '30%',
                background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: 1,
                pointerEvents: 'none',
                borderRadius: '50%',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          color: '#f97316',
          fontSize: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link
          to="projects"
          smooth={true}
          duration={700}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
          aria-label="Scroll down"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <FaChevronDown />
          </motion.div>
          <motion.span
            style={{
              fontSize: '0.85rem',
              marginTop: '0.8rem',
              color: '#94a3b8',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            EXPLORE MORE
          </motion.span>
        </Link>
      </motion.div>
      
      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          
          @media (max-width: 768px) {
            #home {
              padding: 80px 1rem 60px;
            }
            
            #home > div {
              flex-direction: column;
              gap: 1rem;
            }
            
            #home > div > div {
              width: 100%;
              padding: 0;
              max-width: 100%;
            }
            
            #home h1 {
              text-align: center;
            }
            
            #home p {
              text-align: center;
              margin-left: auto;
              margin-right: auto;
            }
            
            #home > div > div:first-child > div {
              justify-content: center;
            }
            
            #home > div > div:last-child {
              order: -1;
              margin-bottom: 2rem;
            }
          }
          
          @media (max-width: 480px) {
            #home {
              padding: 60px 1rem 40px;
            }
            
            #home > div > div:last-child {
              max-width: 280px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;